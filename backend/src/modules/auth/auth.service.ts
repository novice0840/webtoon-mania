import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: SignupDTO) {
    const existing = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async login(dto: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
