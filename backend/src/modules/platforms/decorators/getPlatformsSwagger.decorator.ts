import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetPlatformsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '플랫폼 목록 조회',
    }),
    ApiResponse({
      status: 200,
      description: '성공',
      schema: {
        example: [
          '네이버웹툰',
          '카카오페이지',
          '다음웹툰',
          '레진코믹스',
          '코미코',
        ],
      },
    }),
  );
}
