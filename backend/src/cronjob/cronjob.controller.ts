import { Controller, Get } from '@nestjs/common';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { KakaoCrawlerService } from 'src/crawler/kakaocrawler.service';
import { LezhinCrawlerService } from 'src/crawler/lezhincrawler.service';
import { ToptoonCrawlerService } from 'src/crawler/toptooncrawler.service';
import { ToomicsCrawlerService } from 'src/crawler/toomicscralwer.service';

@Controller('cronjob')
export class CronjobController {
  constructor(
    private readonly lezhinCrawlerService: LezhinCrawlerService,
    private readonly toptoonCrawlerService: ToptoonCrawlerService,
    private readonly toomicsCrawlerService: ToomicsCrawlerService,
    private readonly naverCrawlerService: NaverCrawlerService,
    private readonly kakaoCrawlerService: KakaoCrawlerService,
  ) {}

  @Get('test')
  async test() {
    return this.kakaoCrawlerService.crawlingDayWebtoon();
  }

  @Get('init/naver/webtoon')
  async initAllNaverWebtoon() {
    return this.naverCrawlerService.crawlingWebtoons();
  }

  @Get('init/kakao/webtoon')
  async initAllKakaoWebtoon() {
    return this.kakaoCrawlerService.crawlingWebtoons();
  }

  @Get('init/lezin/webtoon')
  async initAllLezinWebtoon() {
    return this.lezhinCrawlerService.crawlingWebtoons();
  }

  @Get('init/toptoon/webtoon')
  async initAllToptoonWebtoon() {
    return this.toptoonCrawlerService.crawlingWebtoons();
  }

  @Get('init/toomics/webtoon')
  async initAllToomicsWebtoon() {
    return this.toomicsCrawlerService.crawlingWebtoons();
  }
}
