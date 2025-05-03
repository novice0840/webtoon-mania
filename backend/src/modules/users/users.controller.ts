import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CommonResponseType } from 'src/common/dto/commonResponse.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(
    @GetUser() user: { userId: string; email: string },
  ): Promise<CommonResponseType<{ userId: string; email: string }>> {
    return {
      success: true,
      message: '현재 사용자 정보를 성공적으로 가져왔습니다.',
      data: user,
    };
  }
}
