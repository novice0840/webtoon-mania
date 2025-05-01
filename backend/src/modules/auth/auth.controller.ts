import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SignupSwagger } from './decorators/signupSwagger.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @SignupSwagger()
  async getUser(@Body() signupDTO: SignupDTO) {
    await this.authService.createUser(signupDTO);
    return {
      success: true,
      message: '유저 회원가입 성공',
      data: null,
    };
  }
}
