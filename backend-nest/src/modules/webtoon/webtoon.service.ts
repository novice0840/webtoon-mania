import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class WebtoonService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWebtoons() {
    try {
      const response = await fetch('https://example.com/api/webtoons');
    } catch (error) {}
    return this.prisma.webtoon.findMany();
  }

  @Cron('0 * * * * *')
  crawlingWebtoons() {
    console.log('Crawling webtoons...');
  }
}
