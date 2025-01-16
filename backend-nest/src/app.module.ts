import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WebtoonModule } from './modules/webtoon/webtoon.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WebtoonModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
