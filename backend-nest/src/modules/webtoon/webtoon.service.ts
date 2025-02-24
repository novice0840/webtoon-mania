import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { crawlingWebtoons } from 'src/common/utils/crawling';
import { PLATFORMS } from 'src/common/constants/webtoon';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'node:fs';

@Injectable()
export class WebtoonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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

  private async getWebtoon(title, writer, illustrator) {
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

  async getAllWebtoons() {
    try {
      const allWebtoons = await this.crawlingAllWebtoons();
      console.log(`${allWebtoons.length}개 웹툰 크롤링 완료 `);
      for (const webtoon of allWebtoons) {
        try {
          const existingWebtoon = await this.getWebtoon(
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

  @Cron('0 0 * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }

  async uploadImage(imageUrl: string) {
    try {
      const uploadedUrl = await this.uploadImageToGCP(imageUrl);
      console.log(`🌍 최종 업로드된 이미지 URL: ${uploadedUrl}`);
      return uploadedUrl;
    } catch (error) {
      console.error(`🚨 업로드 실패: ${error.message}`);
    }
  }

  async uploadImageToGCP(imageUrl) {
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
}
