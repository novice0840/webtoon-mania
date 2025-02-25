import { Controller, Get, Query } from '@nestjs/common';
import { WebtoonsService } from './webtoons.service';

@Controller('webtoons')
export class WebtoonsController {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Get()
  async getWebtoons(
    @Query('page') page = '1',
    @Query('platform') platform = 'all',
  ) {
    const pageNumber = parseInt(page, 10);
    return await this.webtoonsService.getWebtoons(pageNumber, platform);
  }
}
