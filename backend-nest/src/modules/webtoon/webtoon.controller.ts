import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('all')
  async getAllWebtoons() {
    return await this.webtoonService.getAllWebtoons();
  }
}
