import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CronjobController } from './cronjob.controller';
import { Webtoon } from 'src/entity/webtoon.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerModule } from 'src/crawler/crawler.module';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, Chapter]), CrawlerModule],
  providers: [CronjobService],
  controllers: [CronjobController],
})
export class CronjobModule {}
