import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebtoonsService } from './webtoons.service';
import {
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('webtoons')
export class WebtoonsController {
  constructor(private readonly webtoonsService: WebtoonsService) {}

  @Get('store')
  async storeAllWebtoons() {
    return await this.webtoonsService.storeAllWebtoons();
  }

  @Get()
  @ApiOperation({
    summary: '웹툰 목록 조회',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: '1',
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'platform',
    required: false,
    example: '네이버웹툰',
    description: '플랫폼 (예: "네이버웹툰", "네이버시리즈")',
  })
  @ApiQuery({
    name: 'illustrator',
    required: false,
    example: '명',
    description: '그림 작가',
  })
  @ApiQuery({
    name: 'writer',
    required: false,
    example: '유',
    description: '글 작가',
  })
  async getWebtoons(
    @Query('page') page = '1',
    @Query('platform') platform?: string,
    @Query('illustrator') illustrator?: string,
    @Query('writer') writer?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    return await this.webtoonsService.getWebtoons({
      page: pageNumber,
      platform,
      illustrator,
      writer,
    });
  }

  @Get('webtoon/:id')
  @ApiOperation({
    summary: '단일 웹툰 조회',
    description: 'ID를 통해 단일 웹툰 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '조회할 웹툰의 ID' })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: {
        id: '00031c1a-e23a-47a6-b0cc-8fed4ad8f351',
        title: '성애적 순애보',
        writer: '유',
        illustrator: '명',
        genre: '로맨스',
        synopsis:
          '같은 이유로 각자의 연인에게 이별을 통보한 유별과 이별을 통보받은 한결.헤어진 이유는 같지만 서로를 전혀 이해할 수 없는 두 사람이 하필 파트너로 엮여버렸다??진짜 사랑을 두고 한결과 성애 vs 순애로 충돌하기 시작해 급기야 위험한 내기를 제안하는 유별."사랑이 될 수 있을지 없을지 한번 확인해 볼래요?"',
        thumbnailURL:
          'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/d9da6bdd-b566-43f9-8be6-b92c5875e95c.jpg',
        platforms: ['네이버웹툰', '네이버시리즈'],
      },
    },
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 웹툰이 존재하지 않음',
    schema: {
      example: {
        statusCode: 404,
        message: '잘못된 ID 입니다',
        error: 'Not Found',
      },
    },
  })
  async getWebtoon(@Param('id') id: string) {
    return await this.webtoonsService.getWebtoon(id);
  }
}
