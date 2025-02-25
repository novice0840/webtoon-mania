import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WebtoonsModule } from './modules/webtoons/webtoons.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WebtoonsModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
