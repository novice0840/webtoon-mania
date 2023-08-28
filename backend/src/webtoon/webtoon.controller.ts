import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonsQueryDTO, WebtoonQueryDTO } from 'src/dto';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('/all')
  async getWebtoonAll(@Query() query: WebtoonsQueryDTO) {
    return this.webtoonService.getWebtoonAll(query.page, query.platform);
  }

  @Get('/one')
  getWebtoonOne(@Query() query: WebtoonQueryDTO) {
    // 특정 웹툰의 기본 정보와 댓글 수, 좋아요 수, 별점을 그래프로 보여줌
    return this.webtoonService.getOneWebtoon(query.titleId, query.platform);
  }
}
