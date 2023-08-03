import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
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

  async updateUser(oldUser, newUser) {
    const user = await this.webtoonRepository.findOne({
      where: { email: oldUser.email },
    });
    if (newUser.password) {
      const hashed_password = await bcrypt.hash(newUser.password, 10);
      newUser.hashed_password = hashed_password;
    }
    Object.assign(user, newUser);
    const updatedUser = await this.webtoonRepository.save(user);
    return { email: updatedUser.email, name: updatedUser.name };
  }

  async deleteUser(user) {
    console.log(user);
    const userInfo = await this.webtoonRepository.findOne({
      where: { email: user.email },
    });
    console.log(userInfo);
    const deletedUser = await this.webtoonRepository.save({
      ...userInfo,
      deletedAt: new Date(),
    });
    return { email: deletedUser.email, name: deletedUser.name };
  }
}
