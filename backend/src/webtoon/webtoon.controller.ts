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

  @Get('/comments/:id/:chapter')
  getComments(): string {
    // 특정 웹툰의 특정 화의 베스트 댓글들을 보여준다.
    return 'this is get webtoons comments';
  }
}
