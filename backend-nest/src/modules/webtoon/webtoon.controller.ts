import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get()
  async getWebtoons(
    @Query('page') page = '1', // 기본값 1
    @Query('platform') platform = 'all', // 기본값 "all"
  ) {
    const pageNumber = parseInt(page, 10);
    return await this.webtoonService.getWebtoons(pageNumber, platform);
  }

  @Get('store')
  async storeAllWebtoons() {
    return await this.webtoonService.storeAllWebtoons();
  }
}
