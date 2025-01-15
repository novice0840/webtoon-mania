import { Module } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonController } from './webtoon.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [WebtoonService],
  controllers: [WebtoonController],
})
export class WebtoonModule {}
