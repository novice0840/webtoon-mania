import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private webtoonRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    return this.webtoonRepository.save([
      { name: createUserDto.name, email: createUserDto.email, hashed_password },
    ]);
  }
}
