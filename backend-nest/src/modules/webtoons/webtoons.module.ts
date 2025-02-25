import { Module } from '@nestjs/common';
import { WebtoonService } from './webtoons.service';
import { WebtoonController } from './webtoons.controller';

@Module({
  providers: [WebtoonService],
  controllers: [WebtoonController],
})
export class WebtoonsModule {}
