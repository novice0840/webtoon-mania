import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetGenresSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '장르 목록 조회',
    }),
    ApiResponse({
      status: 200,
      description: '성공',
      schema: {
        type: 'array',
        items: { type: 'string', example: '로맨스' },
        example: ['로맨스', '판타지', '드라마', '스릴러', '액션', '코미디'],
      },
    }),
  );
}
