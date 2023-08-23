import { Controller, Get, Param } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { Webtoon } from 'src/entity/webtoon.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('cronjob')
export class CronjobController {
  constructor(
    private readonly cronjobService: CronjobService,
    private readonly naverCrawlerService: NaverCrawlerService,
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Chapter) private chapterRepository: Repository<Chapter>,
  ) {}

  @Get('test')
  async test() {
    const currentWebtoons = await this.naverCrawlerService.cralwingCurrentWebtoonBase();
    const endWebtoons = await this.naverCrawlerService.crawlingEndWebtoonBase();
    await this.webtoonRepository.save([...currentWebtoons, ...endWebtoons]);
  }

  // @Get('init/naver/all')
  // initAll() {

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
