import { Controller, Get, Param } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';

@Controller('cronjob')
export class CronjobController {
  constructor(
    private readonly cronjobService: CronjobService,
    private readonly naverCrawlerService: NaverCrawlerService,
  ) {}

  @Get('test')
  async test() {
    // const webtoons = await this.naverCrawlerService.cralwingWebtoonBase();
    const webtoons = [{ code: '783053' }];
    return this.naverCrawlerService.crawlingChapter(webtoons);
  }

  // @Get('init/all')
  // initAll() {
  //   return this.cronjobService.initAll();
  // }

  // @Get('init/webtoons')
  // initWebtoons() {
  //   return 'init all webtoon';
  // }

  // @Get('init/dayofweek/:dayofweek')
  // initDayOfWeek(@Param('dayofweek') dayofweek: string) {
  //   return this.cronjobService.initDayOfWeek(dayofweek);
  // }

  // @Get('init/webtoon/:webtoonId')
  // testWebtoon(@Param('webtoonId') webtoonId) {
  //   return this.cronjobService.initWebtoon(webtoonId);
  // }
}
