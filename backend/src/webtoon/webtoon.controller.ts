import { Controller, Get, Param } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('/allwebtoon')
  async getAllWebtoon() {
    return this.webtoonService.getAllWebtoon();
  }

  @Get('/onewebtoon/:id')
  getOneWebtoon(@Param('id') id: string) {
    // 특정 웹툰의 기본 정보와 댓글 수, 좋아요 수, 별점을 그래프로 보여줌
    return this.webtoonService.getOneWebtoon(id);
  }
}
