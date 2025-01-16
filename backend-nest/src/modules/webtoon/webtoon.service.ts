import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { crawlingWebtoons } from 'src/common/utils/crawling';

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
      let allWebtoons = [];
      // for (const platform of platforms) {
      //   const webtoons = await crawlingWebtoons(
      //     platform,
      //     this.configService.get('KMAS_API_KEY'),
      //   );
      //   allWebtoons.push(...webtoons);
      // }
      return await this.prisma.webtoon.create({
        data: {
          title: 'Sample Webtoon',
          writer: 'John Doe',
          illustrator: 'Jane Smith',
          genre: 'Fantasy',
          platforms: {
            create: [
              {
                name: '네이버웹툰',
              },
            ],
          },
          synopsis: 'An exciting webtoon about a magical adventure.',
          thumbnailURL: 'https://example.com/thumbnail.jpg',
        },
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  @Cron('0 * * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
