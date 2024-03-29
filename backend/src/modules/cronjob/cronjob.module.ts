import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CronjobController } from './cronjob.controller';
import { CrawlerModule } from 'src/modules/crawler/crawler.module';
import { Webtoon, DayOfWeek, Author, Genre } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, DayOfWeek, Author, Genre]), CrawlerModule],
  providers: [CronjobService],
  controllers: [CronjobController],
})
export class CronjobModule {}
