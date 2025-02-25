import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('webtoon/:id')
  async getWebtoon(@Param('id') id: string) {
    return await this.webtoonsService.getWebtoon(id);
  }

  @Get('writer/:writer')
  async getWebtoonsByWriter(@Param('writer') writer: string) {
    return await this.webtoonsService.getWebtoonsByWriter(writer);
  }

  @Get('illustrator/:illustrator')
  async getWebtoonsByIllustrator(@Param('illustrator') illustrator: string) {
    return await this.webtoonsService.getWebtoonsByIllustrator(illustrator);
  }
}
