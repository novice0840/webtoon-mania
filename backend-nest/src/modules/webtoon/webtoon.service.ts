import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { crawlingWebtoons } from 'src/common/utils/crawling';
import { PLATFORMS } from 'src/common/constants/webtoon';

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

      allWebtoons.forEach(async (webtoon) => {
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
            if (isPlatformIncluded) return;
            await this.addNewPlatform(existingWebtoon.id, webtoon.platform);
            return;
          }

          await this.createNewWebtoon(webtoon);
          console.log(`Processed webtoon: ${webtoon.title}`);
        } catch (error) {
          console.error(`Failed to process webtoon: ${webtoon.title}`, error);
        }
      });
    } catch (error) {
      console.error(error);
    }
    return 'check';
  }

  @Cron('0 0 * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
