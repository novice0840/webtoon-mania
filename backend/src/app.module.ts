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
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.mysqlConfig,
      inject: [ApiConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return Promise.resolve(addTransactionalDataSource(new DataSource(options)));
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
