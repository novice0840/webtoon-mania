import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CommonResponseDTO,
  CommonResponseType,
} from 'src/common/dto/commonResponse.dto';

const refreshResponseExample: CommonResponseType<{
  accessToken: string;
  refreshToken: string;
}> = {
  success: true,
  message: '토큰이 갱신되었습니다',
  data: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
};

const unauthorizedResponseExample: CommonResponseType = {
  success: false,
  message: '유효하지 않은 리프레시 토큰입니다.',
};

export function RefreshSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '토큰 갱신',
      description:
        'refresh 토큰을 사용하여 새로운 액세스 토큰과 refresh 토큰을 발급받습니다.',
    }),
    ApiBody({
      description: 'refresh 토큰',
      schema: {
        type: 'object',
        properties: {
          refreshToken: {
            type: 'string',
            description: 'refresh 토큰',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '토큰 갱신 성공',
      type: CommonResponseDTO,
      example: refreshResponseExample,
    }),
    ApiResponse({
      status: 401,
      description: '유효하지 않은 refresh 토큰',
      type: CommonResponseDTO,
      example: unauthorizedResponseExample,
    }),
  );
}
