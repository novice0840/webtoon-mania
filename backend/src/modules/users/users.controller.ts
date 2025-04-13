import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get()
  async getUser() {
    return {
      success: true,
      message: '유저 정보 응답 성공',
      data: { user: {} },
    };
  }
}
