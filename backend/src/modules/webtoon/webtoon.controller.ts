import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonListQueryDTO, WebtoonDetailDTO, WebtoonListDTO } from 'src/modules/webtoon/dto';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('webtoon')
@ApiTags('Webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('/list')
  @ApiOkResponse({ description: '웹툰 목록 불러오기 성공', type: WebtoonListDTO })
  async getWebtoonAll(@Query() query: WebtoonListQueryDTO): Promise<WebtoonListDTO> {
    return this.webtoonService.getWebtoonList(query);
  }

  @Get('/detail/:id')
  @ApiOkResponse({ description: '웹툰 상세 정보 불러오기 성공', type: WebtoonDetailDTO })
  getWebtoonOne(@Param('id') id: string): Promise<WebtoonDetailDTO> {
    return this.webtoonService.getOneWebtoon(id);
  }

  @Get('/kinds')
  @ApiOkResponse({ description: '인기 장르 50개 불러오기 성공' })
  getWebtoonKinds(): Promise<string[]> {
    return this.webtoonService.getWebtoonKinds();
  }
}
