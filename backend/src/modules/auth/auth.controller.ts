import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/loginResponse.dto';
import {
  SignupSwagger,
  SignupResponse,
} from './decorators/signupSwagger.decorator';
import { LoginSwagger } from './decorators/loginSwagger.decorator';
import { CommonResponseType } from 'src/common/dto/commonResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @SignupSwagger()
  async signup(@Body() signupDTO: SignupDTO): Promise<CommonResponseType> {
    await this.authService.signup(signupDTO);
    return {
      success: true,
      message: '유저 회원가입 성공',
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @LoginSwagger()
  async login(
    @Body() loginDTO: LoginDTO,
  ): Promise<
    CommonResponseType<{ accessToken: string; refreshToken: string }>
  > {
    return {
      success: true,
      message: '로그인에 성공하였습니다',
      data: await this.authService.login(loginDTO),
    };
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<CommonResponseType<{ accessToken: string }>> {
    return {
      success: true,
      message: '토큰이 갱신되었습니다',
      data: await this.authService.refreshToken(refreshToken),
    };
  }
}
