import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save([{ name: createUserDto.name, email: createUserDto.email, hashedPassword }]);
    return { message: 'user created' };
  }

  async getUser(userId) {
    return this.userRepository.findOne({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: { id: userId },
    });
  }

  async updateUser(userId, newUser) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (newUser.password) {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.hashedPassword = hashedPassword;
    }
    Object.assign(user, newUser);
    const updatedUser = await this.userRepository.save(user);
    return { email: updatedUser.email, name: updatedUser.name };
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const deletedUser = await this.userRepository.save({
      ...user,
      deletedAt: new Date(),
    });
    return { email: deletedUser.email, name: deletedUser.name };
  }
}
