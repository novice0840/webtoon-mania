import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetWebtoonsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '웹툰 목록 조회',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      example: '1',
      description: '페이지 번호',
    }),
    ApiQuery({
      name: 'platform',
      required: false,
      example: '네이버웹툰',
      description: '플랫폼 (예: "네이버웹툰", "네이버시리즈")',
    }),
    ApiQuery({
      name: 'illustrator',
      required: false,
      example: '명',
      description: '그림 작가',
    }),
    ApiQuery({
      name: 'writer',
      required: false,
      example: '유',
      description: '글 작가',
    }),
    ApiQuery({
      name: 'genre',
      required: false,
      example: '로맨스',
      description: '장르',
    }),
    ApiResponse({
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
          ],
        },
      },
    }),
  );
}
