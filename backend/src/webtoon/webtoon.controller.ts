import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonListQueryDTO, WebtoonDetailQueryDTO, WebtoonDetailDTO, WebtoonListDTO } from 'src/dto';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  // 여러 웹툰들을 배열로 요청
  @Get('/list')
  async getWebtoonAll(@Query() query: WebtoonListQueryDTO): Promise<any> {
    return this.webtoonService.getWebtoonList(query);
  }

  // 특정 한 웹툰의 세부 정보
  @Get('/detail')
  getWebtoonOne(@Query() query: WebtoonDetailQueryDTO): Promise<WebtoonDetailDTO> {
    return this.webtoonService.getOneWebtoon(query);
  }
}
