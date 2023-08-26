import { Module } from '@nestjs/common';
import { NaverCrawlerService } from './navercrawler.service';
import { KakaoCrawlerService } from './kakaocrawler.service';
import { ToptoonCrawlerService } from './toptooncrawler.service';
import { ToomicsCrawlerService } from './toomicscralwer.service';
import { LezinCrawlerService } from './lezincrawler.service';
import { Webtoon, Chapter } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Webtoon, Chapter]), CrawlerModule],

  providers: [
    NaverCrawlerService,
    KakaoCrawlerService,
    ToptoonCrawlerService,
    ToomicsCrawlerService,
    LezinCrawlerService,
  ],
  exports: [
    NaverCrawlerService,
    KakaoCrawlerService,
    ToptoonCrawlerService,
    ToomicsCrawlerService,
    LezinCrawlerService,
  ],
})
export class CrawlerModule {}
