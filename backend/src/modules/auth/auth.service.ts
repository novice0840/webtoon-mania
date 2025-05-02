import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signup.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
