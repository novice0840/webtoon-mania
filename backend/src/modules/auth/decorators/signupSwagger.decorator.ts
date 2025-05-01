import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonResponseDTO } from 'src/common/DTO/commonResponse.DTO';
import { SignupDTO } from '../dto/signup.dto';

export function SignupSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '회원가입',
      description: '이메일과 비밀번호를 사용하여 회원가입합니다.',
    }),
    ApiBody({
      description: '회원가입 정보',
      type: SignupDTO,
    }),
    ApiResponse({
      status: 201,
      description: '회원가입 성공',
      type: CommonResponseDTO,
      example: {
        success: true,
        message: '유저 회원가입 성공',
        data: null,
      },
    }),
  );
}
