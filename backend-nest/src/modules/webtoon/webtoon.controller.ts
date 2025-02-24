import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('store')
  async storeAllWebtoons() {
    return await this.webtoonService.storeAllWebtoons();
  }

  @Get('/')
  async getWebtoons() {
    return await this.webtoonService.getWebtoons();
  }
}
