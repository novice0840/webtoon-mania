import { Module } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';
import { WebtoonController } from './webtoon.controller';

@Module({
  providers: [WebtoonService],
  controllers: [WebtoonController],
})
export class WebtoonModule {}
