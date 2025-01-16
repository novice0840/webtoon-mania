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
      const webtoons = await crawlingWebtoons(
        '네이버웹툰',
        this.configService.get('KMAS_API_KEY'),
      );
      console.log(webtoons);
    } catch (error) {}
    return this.prisma.webtoon.findMany();
  }

  @Cron('0 * * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
