import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebtoonsService } from './webtoons.service';
import { GetWebtoonsSwagger } from './decorators/getWebtoonsSwagger.decorator';
import { GetWebtoonSwagger } from './decorators/getWebtoonSwagger.decorator';

@Controller('webtoons')
export class WebtoonsController {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  // 초기 웹툰 데이터 크롤링용 엔드포인트 웹툰 데이터가 이미 있는 상태에서는 사용할 필요 없음
  // @Get('store')
  // async storeAllWebtoons() {
  //   return await this.webtoonsService.storeAllWebtoons();
  // }

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
