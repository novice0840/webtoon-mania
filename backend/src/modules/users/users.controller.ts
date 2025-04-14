import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async getUser(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.createUser(createUserDto);
    return {
      success: true,
      message: '유저 정보 응답 성공',
      data: { user },
    };
  }
}
