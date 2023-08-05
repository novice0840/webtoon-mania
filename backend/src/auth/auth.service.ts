import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async loginJwt(loginUser: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUser.email },
    });
    const payload = {
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException('이메일이 등록되지 않았습니다');
    }
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다');
    }
    const { hashedPassword, ...result } = user;
    return result;
  }
}
