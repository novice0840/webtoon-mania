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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @SignupSwagger()
  async signup(@Body() signupDTO: SignupDTO): Promise<SignupResponse> {
    await this.authService.createUser(signupDTO);
    return {
      success: true,
      message: '유저 회원가입 성공',
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @LoginSwagger()
  async login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(loginDTO);
  }
}
