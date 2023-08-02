import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local.gurad';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.loginJwt(req.user);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Request() req) {
    return req.user;
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
