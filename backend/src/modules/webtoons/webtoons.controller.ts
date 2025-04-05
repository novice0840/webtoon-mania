import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebtoonsService } from './webtoons.service';
import { GetWebtoonsSwagger } from 'src/common/decorators/swagger/getWebtoons.decorator';
import { GetWebtoonSwagger } from 'src/common/decorators/swagger/getWebtoon.decorator';

@Controller('webtoons')
export class WebtoonsController {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Get('store')
  async storeAllWebtoons() {
    return await this.webtoonsService.storeAllWebtoons();
  }

  @Get()
  @GetWebtoonsSwagger()
  async getWebtoons(
    @Query('page') page = '1',
    @Query('platform') platform?: string,
    @Query('illustrator') illustrator?: string,
    @Query('writer') writer?: string,
    @Query('genre') genre?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    return await this.webtoonsService.getWebtoons({
      page: pageNumber,
      platform,
      illustrator,
      writer,
      genre,
    });
  }

  @Get('webtoon/:id')
  @GetWebtoonSwagger()
  async getWebtoon(@Param('id') id: string) {
    return await this.webtoonsService.getWebtoon(id);
  }
}
