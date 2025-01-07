import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(ApiBearerAuth(), ApiUnauthorizedResponse({ description: '권한이 없는 사용자입니다' }));
}
