import { Module } from '@nestjs/common';
import { WebtoonController } from './webtoon.controller';
import { WebtoonService } from './webtoon.service';
import { Webtoon, Genre, DayOfWeek, Author } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, Genre, DayOfWeek, Author])],
  controllers: [WebtoonController],
  providers: [WebtoonService],
})
export class WebtoonModule {}
