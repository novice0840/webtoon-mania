import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WebtoonModule } from './modules/webtoon/webtoon.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [WebtoonModule, PrismaModule, ScheduleModule.forRoot()],
})
export class AppModule {}
