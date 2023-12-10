import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonListQueryDTO, WebtoonDetailDTO } from 'src/dto';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  // 여러 웹툰들을 배열로 요청
  @Get('/list')
  async getWebtoonAll(@Query() query: WebtoonListQueryDTO) {
    return this.webtoonService.getWebtoonList(query);
  }

  // 특정 한 웹툰의 세부 정보
  @Get('/detail/:id')
  getWebtoonOne(@Param('id') id: string) {
    return this.webtoonService.getOneWebtoon(id);
  }

  // 웹툰 인기 장르 50개 반환
  @Get('/kinds')
  getWebtoonKinds() {
    return this.webtoonService.getWebtoonKinds();
  }

  // Test Controller
  @Get('test')
  test() {
    try {
      throw new Error('');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
