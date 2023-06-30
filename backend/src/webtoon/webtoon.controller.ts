import { Controller, Get } from '@nestjs/common';

@Controller('webtoon')
export class WebtoonController {
  @Get('/allwebtoon')
  getAllWebtoon(): string {
    return 'this is get all webtoons';
  }

  @Get('/onewebtoon/:id')
  getOneWebtoon(): string {
    // 특정 웹툰의 기본 정보와 댓글 수, 좋아요 수, 별점을 그래프로 보여줌
    return 'this is get one webtoon';
  }

  @Get('/comments/:id/:chapter')
  getComments(): string {
    // 특정 웹툰의 특정 화의 베스트 댓글들을 보여준다.
    return 'this is get webtoons comments';
  }
}
