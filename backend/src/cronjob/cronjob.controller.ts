import { Controller, Get, Param } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { KakaoCrawlerService } from 'src/crawler/kakaocrawler.service';
import { Webtoon } from 'src/entity/webtoon.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoCrawlerService } from './../crawler/kakaocrawler.service';

@Controller('cronjob')
export class CronjobController {
  constructor(
    private readonly cronjobService: CronjobService,
    private readonly naverCrawlerService: NaverCrawlerService,
    private readonly kakaoCrawlerService: KakaoCrawlerService,
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Chapter) private chapterRepository: Repository<Chapter>,
  ) {}

  @Get('test')
  async test() {
    const currentWebtoons = await this.naverCrawlerService.cralwingCurrentWebtoonBase();
    const endWebtoons = await this.naverCrawlerService.crawlingEndWebtoonBase();
    await this.webtoonRepository.save([...currentWebtoons, ...endWebtoons]);
  }

  @Get('init/naver/webtoon')
  async initAllNaverWebtoon() {
    const currentWebtoons = await this.naverCrawlerService.cralwingCurrentWebtoonBase();
    const endWebtoons = await this.naverCrawlerService.crawlingEndWebtoonBase();
    await this.webtoonRepository.save([...currentWebtoons, ...endWebtoons]);
  }

  @Get('init/naver/chapter')
  async initAllNaverWebtoonChapter() {
    const webtoons = await this.webtoonRepository.find({ select: ['id'] });
    const webtoonIds = webtoons.map((webtoon) => webtoon.id);
    let i = 1;
    for await (const webtoonId of webtoonIds) {
      const chapters = await this.naverCrawlerService.crawlingChapters(webtoonId);
      await this.chapterRepository.save(chapters);
      console.log(`${i}째 웹툰 Chapters save 완료`);
      i += 1;
    }
  }

  @Get('init/kakao/webtoon')
  async initAllKakaoWebtoon() {
    return this.kakaoCrawlerService;
  }

  // @Get('init/webtoon/:webtoonId')
  // testWebtoon(@Param('webtoonId') webtoonId) {
  //   return this.cronjobService.initWebtoon(webtoonId);
  // }
}
