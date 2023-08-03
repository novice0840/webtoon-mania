import { Module } from '@nestjs/common';
import { WebtoonController } from './webtoon.controller';
import { WebtoonService } from './webtoon.service';
import { Webtoon, Chapter } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, Chapter])],
  controllers: [WebtoonController],
  providers: [WebtoonService],
})
export class WebtoonModule {}
