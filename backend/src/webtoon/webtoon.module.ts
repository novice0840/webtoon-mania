import { Module } from '@nestjs/common';
import { WebtoonController } from './webtoon.controller';
import { WebtoonService } from './webtoon.service';
import { Webtoon } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon])],
  controllers: [WebtoonController],
  providers: [WebtoonService],
})
export class WebtoonModule {}
