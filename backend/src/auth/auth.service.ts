import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { DataSource } from 'typeorm';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly datasource: DataSource) {}
  async login(loginUserDto: LoginUserDto) {
    const isMatch = await compare(loginUserDto.password, 'plain');
    return loginUserDto;
  }

  async signUp(createUserDto: CreateUserDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    const hashedPassword = await hash(createUserDto.password, 10);
    try {
      await queryRunner.manager.query(
        `insert into user (email, name, hashed_password) values (${createUserDto.email}, ${createUserDto.name}, ${hashedPassword})`,
      );
    } catch (error) {
      console.log(error);
    } finally {
      queryRunner.release();
    }
    return createUserDto;
  }

  private async getUserByEmail(email: string): Promise<boolean> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    const user = await queryRunner.manager.query(
      `select email, name from user where email = ${email}`,
    );
    await queryRunner.release();
    if (user) {
      return user;
    }
    throw new HttpException(
      '해당 이메일의 사용자가 존재하지 않습니다',
      HttpStatus.NOT_FOUND,
    );
  }
}
