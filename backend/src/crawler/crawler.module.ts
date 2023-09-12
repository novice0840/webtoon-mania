import { Module } from '@nestjs/common';
import { NaverCrawlerService } from './navercrawler.service';
import { KakaoCrawlerService } from './kakaocrawler.service';
import { ToptoonCrawlerService } from './toptooncrawler.service';
import { ToomicsCrawlerService } from './toomicscralwer.service';
import { LezhinCrawlerService } from './lezhincrawler.service';
import { Webtoon, DayOfWeek, Author, Genre } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, DayOfWeek, Author, Genre]), CrawlerModule],

  providers: [
    NaverCrawlerService,
    KakaoCrawlerService,
    ToptoonCrawlerService,
    ToomicsCrawlerService,
    LezhinCrawlerService,
  ],
  exports: [
    NaverCrawlerService,
    KakaoCrawlerService,
    ToptoonCrawlerService,
    ToomicsCrawlerService,
    LezhinCrawlerService,
  ],
})
export class CrawlerModule {}
