import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { crawlingWebtoons } from 'src/common/utils/crawling';
import { Platform } from 'src/types/webtoon';

@Injectable()
export class WebtoonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getAllWebtoons() {
    try {
      const platforms = [
        '네이버웹툰',
        '다음웹툰',
        '카카오페이지',
        '레진코믹스',
        '코미코',
        '네이버시리즈',
        '북큐브',
        '미스터블루',
        '네이트툰앤북',
        '원스토리',
        '피너툰',
        '조아라',
        '짱만화',
        '봄툰',
        '탑툰',
        '무툰',
      ];

      const crawlingResults = await Promise.allSettled(
        platforms.map((platform) =>
          crawlingWebtoons(platform, this.configService.get('KMAS_API_KEY')),
        ),
      );

      const allWebtoons = crawlingResults
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result: any) => result.value);

      allWebtoons.forEach(async (webtoon) => {
        try {
          const existingWebtoon = await this.prisma.webtoon.findFirst({
            where: {
              title: webtoon.title,
              writer: webtoon.writer,
              illustrator: webtoon.illustrator,
            },
            include: {
              platforms: {
                include: {
                  platform: true,
                },
              },
            },
          });

          if (existingWebtoon) {
            const isPlatformIncluded = existingWebtoon.platforms.some(
              (p) => p.platform.name === webtoon.platform,
            );
            if (isPlatformIncluded) return;

            await this.prisma.webtoonPlatform.create({
              data: {
                webtoon: {
                  connect: {
                    id: existingWebtoon.id,
                  },
                },
                platform: {
                  connectOrCreate: {
                    where: { name: webtoon.platform },
                    create: { name: webtoon.platform },
                  },
                },
              },
            });
            return;
          }

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
          console.log(`Processed webtoon: ${webtoon.title}`);
        } catch (error) {
          console.error(`Failed to process webtoon: ${webtoon.title}`, error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Cron('0 0 * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
