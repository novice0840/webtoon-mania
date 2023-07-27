import { Controller, Get, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return 'get user information';
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  @Delete()
  deleteUser() {
    return 'delete user';
  }
}
