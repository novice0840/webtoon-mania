import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonService } from './webtoons.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get()
  async getWebtoons(
    @Query('page') page = '1',
    @Query('platform') platform = 'all',
  ) {
    const pageNumber = parseInt(page, 10);
    return await this.webtoonService.getWebtoons(pageNumber, platform);
  }
}
