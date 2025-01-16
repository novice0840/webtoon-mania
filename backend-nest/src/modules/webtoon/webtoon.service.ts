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
        // '다음웹툰',
        // '카카오페이지',
        // '레진코믹스',
        // '코미코',
        // '네이버시리즈',
        // '북큐브',
        // '미스터블루',
        // '네이트툰앤북',
        // '원스토리',
        // '피너툰',
        // '조아라',
        // '짱만화',
        // '봄툰',
        // '탑툰',
        // '무툰',
      ];
      let allWebtoons = [];
      for (const platform of platforms) {
        const webtoons = await crawlingWebtoons(
          platform,
          this.configService.get('KMAS_API_KEY'),
        );
        allWebtoons.push(...webtoons);
      }

      for (const webtoon of allWebtoons) {
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
        console.log(webtoon.title, 'Existing webtoon:', existingWebtoon.title);
        if (existingWebtoon) {
          const isPlatformIncluded = existingWebtoon.platforms.some(
            (p) => p.platform.name === webtoon.platform,
          );
          if (isPlatformIncluded) continue;

          // 기존 웹툰에 플랫폼이 추가된 경우
          const webtoonPlatform = await this.prisma.webtoonPlatform.create({
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
          console.log('Webtoon platform created:', webtoonPlatform);
          continue;
        }

        // 새 웹툰인 경우
        const { platform, ...webtoonData } = webtoon;
        const createdWebtoon = await this.prisma.webtoon.create({
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
        console.log('Webtoon created:', createdWebtoon.title);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  @Cron('0 0 * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
