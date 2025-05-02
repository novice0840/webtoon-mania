import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from '../dto/login.dto';
import { LoginResponseDTO } from '../dto/loginResponse.dto';

const loginResponseExample: LoginResponseDTO = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '로그인',
      description: '이메일과 비밀번호를 사용하여 로그인합니다.',
    }),
    ApiBody({
      description: '로그인 정보',
      type: LoginDTO,
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      type: LoginResponseDTO,
      example: loginResponseExample,
    }),
    ApiResponse({
      status: 401,
      description: '이메일 또는 비밀번호가 일치하지 않음',
      schema: {
        example: {
          success: false,
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        },
      },
    }),
  );
}
