import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from 'src/modules/auth/strategy/local.strategy';
import { JwtStrategy } from 'src/modules/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1y' },
    }),
  ],

  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
