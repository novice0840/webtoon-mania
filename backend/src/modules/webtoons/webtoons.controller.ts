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
  @ApiQuery({
    name: 'genre',
    required: false,
    example: '로맨스',
    description: '장르',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: {
        totalPage: 128,
        totalCount: 12730,
        curPage: 1,
        data: [
          {
            id: '00031c1a-e23a-47a6-b0cc-8fed4ad8f351',
            title: '성애적 순애보',
            writer: '유',
            illustrator: '명',
            genre: '로맨스',
            synopsis:
              '같은 이유로 각자의 연인에게 이별을 통보한 유별과 이별을 통보받은 한결.헤어진 이유는 같지만 서로를 전혀 이해할 수 없는 두 사람이 하필 파트너로 엮여버렸다??진짜 사랑을 두고 한결과 성애 vs 순애로 충돌하기 시작해 급기야 위험한 내기를 제안하는 유별."사랑이 될 수 있을지 없을지 한번 확인해 볼래요?"',
            thumbnailURL:
              'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/d9da6bdd-b566-43f9-8be6-b92c5875e95c.jpg',
          },
          {
            id: '0009c433-93bd-49aa-9ae5-e0abadb7fd7d',
            title: '맨크러쉬',
            writer: '시루미',
            illustrator: '시루미',
            genre: 'BL',
            synopsis:
              '1부오랫동안 친구 연수에 대한 애정을 품고 있던 진호.자신을 쾌락의 대상으로만 생각하는 연수에게 실망하여 떠나려하지만...알고 보니 그도 같은 마음이었다?2부유명 속옷회사에서 일하고 있는 진호의 형 천호의 이야기.짝사랑하는 대학 후배 지윤이 신입으로 입사하자 눈이 번쩍 트이고!섹스파트너인 오은별을 상대로 경험을 쌓으며 지윤의 마음을 얻기 위해 애쓴다.하지만 은별이 천호에게 남다른 감정을 품게 되고...3부서로 탑 포지션만을 차지하길 원하는 커플의 이야기.은별의 영국인 친구 아담을 보자마자 첫눈에 반한 성환.하지만 둘 다 탑 포지션을 원하기에, 피치 못하게 몸의 대화 없는 건전한 연애를 하게 된다.4부천호에게 감정이 남아있는 은별 앞에 우연히 나타난 아저씨, 헨리.호텔에서 나오게 된 은별은 헨리와 함께 살기로 결정하는데...어느 날, 둘 앞에 헨리의 약혼녀가 등장했다?',
            thumbnailURL:
              'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/d3e67ef5-7181-40a3-bf38-b2e870e46a89.jpg',
          },
          {
            id: '000a9eae-b513-4e21-b0c2-577c4eb58e9a',
            title: '흙수저, 시스템에게 선택받다',
            writer: '이십사,tab',
            illustrator: '소행도',
            genre: '소년',
            synopsis:
              "대재앙이 있은 후로 100년, A시는 잊혀진 도시로 전락했다. 신분 상승을 위해서라면 희망의 도시 H시로 가거나, 군사학교에 입학해 에스퍼 솔져로 거듭나야 한다.나 고지웅은 A시 출신으로 H시의 군사학교를 목표로 열공 중인 고3 학생이다. 그러나 민새아의 등장이... 정확히는 이 죽일 놈의 '시스템'의 등장이 평범했던 내 일상과 운명을 뒤흔드는데... 그러니까 첫 번째 퀘스트가 전지전능한 H시 유니언군 소속의 민새아를 제물로 바치는 것이고, 그 대가로 내 실력을 키워주겠다고...? 사기꾼 냄새가 나긴 하지만, 강해지기 위해서 뭐라도 해보는 수밖에!",
            thumbnailURL:
              'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/b9d486bf-efe3-4adb-aeb6-17e6f850c5ac.jpg',
          },
          {
            id: '000e88c2-424f-4513-bd49-598c7dd0502c',
            title: '갸오오와 사랑꾼들',
            writer: '',
            illustrator: '갸오오',
            genre: '코믹',
            synopsis:
              '차이고, 퇴짜맞는 것은 일상 하지만 절대 기죽지 않아!! 갸오오와 친구들의 좌충우돌 사랑 도전기',
            thumbnailURL:
              'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/885d6430-b04e-4ee6-a77d-fc3d34498457.jpg',
          },
        ],
      },
    },
  })
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
