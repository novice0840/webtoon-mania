import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async getUser(@Body() signupDTO: SignupDTO) {
    const user = await this.authService.createUser(signupDTO);
    return {
      success: true,
      message: '유저 회원가입 성공',
      data: { user },
    };
  }
}
