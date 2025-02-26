import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { crawlingWebtoons } from 'src/common/utils/crawling';
import { PLATFORMS } from 'src/common/constants/webtoon';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Cron } from '@nestjs/schedule';

const WEBTOONS_PER_PAGE = 100;
@Injectable()
export class WebtoonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @Cron('0 0 23 * * *')
  async storeAllWebtoons() {
    try {
      const allWebtoons = await this.crawlingAllWebtoons();
      console.log(`${allWebtoons.length}개 웹툰 크롤링 완료 `);
      for (const webtoon of allWebtoons) {
        try {
          const existingWebtoon = await this.fetchWebtoon(
            webtoon.title,
            webtoon.writer,
            webtoon.illustrator,
          );

          if (existingWebtoon) {
            const isPlatformIncluded = existingWebtoon.platforms.some(
              (p) => p.platform.name === webtoon.platform,
            );
            if (isPlatformIncluded) continue;
            await this.addNewPlatform(existingWebtoon.id, webtoon.platform);
            continue;
          }

          const thumbnailURL = await this.uploadImage(webtoon.thumbnailURL);
          await this.createNewWebtoon({ ...webtoon, thumbnailURL });
          console.log(`Processed webtoon: ${webtoon.title}`);
        } catch (error) {
          console.error(`Failed to process webtoon: ${webtoon.title}`, error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async getWebtoons({
    page,
    platform,
    illustrator,
    writer,
  }: {
    page: number;
    platform?: string;
    illustrator?: string;
    writer?: string;
  }) {
    const totalCount = await this.getWebtoonCount(
      platform,
      illustrator,
      writer,
    );
    const totalPage = Math.ceil(totalCount / WEBTOONS_PER_PAGE);
    const webtoons = await this.fetchWebtoons({
      page,
      platform,
      illustrator,
      writer,
    });
    return {
      totalPage,
      curPage: page,
      data: webtoons,
    };
  }

  private async uploadImage(imageUrl: string) {
    try {
      const uploadedUrl = await this.uploadImageToGCP(imageUrl);
      console.log(`🌍 최종 업로드된 이미지 URL: ${uploadedUrl}`);
      return uploadedUrl;
    } catch (error) {
      console.error(`🚨 업로드 실패: ${error.message}`);
    }
  }

  public async getWebtoon(id: string) {
    const webtoon = await this.prisma.webtoon.findUnique({
      where: {
        id,
      },
      include: {
        platforms: {
          select: {
            platform: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!webtoon) {
      throw new NotFoundException(`잘못된 ID 입니다`);
    }

    return {
      ...webtoon,
      platforms: webtoon.platforms.map((p) => p.platform.name),
    };
  }

  private async uploadImageToGCP(imageUrl) {
    const keyFilePath = path.resolve(
      __dirname,
      '../../../gcp-storage-key.json',
    );

    const storage = new Storage({
      keyFilename: keyFilePath,
    });
    const bucketName = this.configService.get('GCP_BUCKET_NAME');
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`이미지 다운로드 실패: ${response.statusText}`);

    const buffer = await response.arrayBuffer();
    const fileName = `thumbnails/${uuidv4()}.jpg`;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    await file.save(Buffer.from(buffer), {
      contentType: response.headers.get('content-type') || 'image/jpeg',
      public: true,
    });
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return publicUrl;
  }

  private async crawlingAllWebtoons() {
    const crawlingResults = await Promise.allSettled(
      PLATFORMS.map((platform) =>
        crawlingWebtoons(platform, this.configService.get('KMAS_API_KEY')),
      ),
    );

    return crawlingResults
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value);
  }

  private async fetchWebtoon(title, writer, illustrator) {
    return await this.prisma.webtoon.findFirst({
      where: {
        title,
        writer,
        illustrator,
      },
      include: {
        platforms: {
          include: {
            platform: true,
          },
        },
      },
    });
  }

  private async addNewPlatform(webtoonId, platform) {
    return await this.prisma.webtoonPlatform.create({
      data: {
        webtoon: {
          connect: {
            id: webtoonId,
          },
        },
        platform: {
          connectOrCreate: {
            where: { name: platform },
            create: { name: platform },
          },
        },
      },
    });
  }

  private async createNewWebtoon(webtoon) {
    const { platform, ...webtoonData } = webtoon;
    await this.prisma.webtoon.create({
      data: {
        ...webtoonData,
        platforms: {
          create: {
            platform: {
              connectOrCreate: {
                where: { name: platform },
                create: { name: platform },
              },
            },
          },
        },
      },
    });
  }

  private getWebtoonCount(platform, illustrator, writer) {
    return this.prisma.webtoon.count({
      where: {
        illustrator,
        writer,
        platforms: {
          some: {
            platform: { name: platform },
          },
        },
      },
    });
  }

  private async fetchWebtoons({ page, platform, illustrator, writer }) {
    const skip = (page - 1) * WEBTOONS_PER_PAGE;
    return await this.prisma.webtoon.findMany({
      where: {
        illustrator,
        writer,
        platforms: {
          some: {
            platform: { name: platform },
          },
        },
      },
      take: WEBTOONS_PER_PAGE,
      skip,
    });
  }
}
