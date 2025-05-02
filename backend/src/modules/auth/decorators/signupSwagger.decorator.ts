import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CommonResponseDTO,
  CommonResponseType,
} from 'src/common/dto/commonResponse.dto';
import { SignupDTO } from '../dto/signup.dto';

export type SignupResponse = CommonResponseType;

const signupResponseExample: SignupResponse = {
  success: true,
  message: '회원가입 성공',
};

const conflictResponseExample: SignupResponse = {
  success: false,
  message: '이미 가입된 이메일입니다.',
};

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
      example: signupResponseExample,
    }),
    ApiResponse({
      status: 409,
      description: '이미 가입된 이메일',
      type: CommonResponseDTO,
      example: conflictResponseExample,
    }),
  );
}
