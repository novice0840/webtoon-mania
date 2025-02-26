import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/prisma/prisma.module';

import { WebtoonsModule } from './modules/webtoons/webtoons.module';
import { GenresModule } from './modules/genres/genres.module';
import { PlatformsModule } from './modules/platforms/platforms.module';

@Module({
  imports: [
    GenresModule,
    WebtoonsModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PlatformsModule,
  ],
})
export class AppModule {}
