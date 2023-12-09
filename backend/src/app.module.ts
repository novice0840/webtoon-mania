import { Module } from '@nestjs/common';
import { WebtoonModule } from './webtoon/webtoon.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobModule } from './cronjob/cronjob.module';
import { AuthModule } from './auth/auth.module';
import { ChattingModule } from './chatting/chatting.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { CrawlerModule } from './crawler/crawler.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['./entity/**/*.entity.ts'],
        autoLoadEntities: true,
        synchronize: true,
        // logging: true,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ScheduleModule.forRoot(),
    WebtoonModule,
    CronjobModule,
    AuthModule,
    ChattingModule,
    UserModule,
    CommentModule,
    CrawlerModule,
  ],
})
export class AppModule {}
