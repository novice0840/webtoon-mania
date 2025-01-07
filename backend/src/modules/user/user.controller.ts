import { Controller, Get, Put, Delete, Body, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from 'src/guards/local.gurad';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { Ip } from '@nestjs/common';
import { UserId } from 'src/decorators/userId.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: '로그인 성공' })
  login(@Request() req) {
    return this.authService.loginJwt(req.user);
  }

  @Post('signup')
  @ApiCreatedResponse({ description: '회원가입 성공' })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiOkResponse({ description: '내 회원정보 불러오기 성공' })
  @Auth()
  getUser(@UserId() id) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('info')
  @ApiOkResponse({ description: '내 회원정보 수정하기 성공' })
  @Auth()
  updateUser(@Body() updateUserDto: UpdateUserDto, @UserId() id) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOkResponse({ description: '회원탈퇴 성공' })
  @Auth()
  deleteUser(@UserId() id) {
    return this.userService.deleteUser(id);
  }
}
