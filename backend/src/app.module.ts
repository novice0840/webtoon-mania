import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebtoonModule } from './webtoon/webtoon.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobModule } from './cronjob/cronjob.module';
import { AuthModule } from './auth/auth.module';
import { ChattingModule } from './chatting/chatting.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { Chapter } from './entity/chapter.entity';
import { Webtoon } from './entity/webtoon.entity';
import { Chatting } from './entity/chatting.entity';
import { Comment } from './entity/comment.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Webtoon, Chapter, Comment, User, Chatting],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    WebtoonModule,
    CronjobModule,
    AuthModule,
    ChattingModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
