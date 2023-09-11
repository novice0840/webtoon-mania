import { Controller, Get, Param } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { KakaoCrawlerService } from 'src/crawler/kakaocrawler.service';
import { LezhinCrawlerService } from 'src/crawler/lezhincrawler.service';
import { ToptoonCrawlerService } from 'src/crawler/toptooncrawler.service';
import { ToomicsCrawlerService } from 'src/crawler/toomicscralwer.service';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('cronjob')
export class CronjobController {
  constructor(
    private readonly lezhinCrawlerService: LezhinCrawlerService,
    private readonly toptoonCrawlerService: ToptoonCrawlerService,
    private readonly toomicsCrawlerService: ToomicsCrawlerService,
    private readonly naverCrawlerService: NaverCrawlerService,
    private readonly kakaoCrawlerService: KakaoCrawlerService,
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
  ) {}

  @Get('test')
  async test() {
    // const data = await this.webtoonRepository.find({ select: ['tags'] });
    // const tagCount = {};
    // data
    //   .flatMap((element) => element.tags)
    //   .forEach((element, index) => {
    //     if (element in tagCount) {
    //       tagCount[element] += 1;
    //     } else {
    //       tagCount[element] = 0;
    //     }
    //   });
    // return Object.keys(tagCount).filter((element) => tagCount[element] > 50);
    //.map((element) => ({ element: tagCount[element] }));
  }

  // 새로 생긴 웹툰 추가 및 완결된 웹툰 수정
  @Get('naver/webtoon/update')
  async naverWebtoonUpdate() {
    const currentWebtoons = await this.naverCrawlerService.cralwingCurrentWebtoonBase();
    const storedCurrentWebtoons = await this.webtoonRepository.find({
      select: ['id', 'titleId'],
    });
    // 연재 종료된 웹툰
    const endWebtoons = storedCurrentWebtoons
      .filter((webtoon) => !currentWebtoons.map((currentWebtoon) => currentWebtoon.titleId).includes(webtoon.titleId))
      .map((webtoon) => ({ ...webtoon, isEnd: true }));
    // 새롭게 연재 시작한 웹툰
    const newWebtoons = currentWebtoons.filter(
      (webtoon) => !storedCurrentWebtoons.map((storedWebtoon) => storedWebtoon.titleId).includes(webtoon.titleId),
    );
    const updateWebtoons = [...endWebtoons, ...newWebtoons];
    await this.webtoonRepository.save(updateWebtoons);
  }

  @Get('init/naver/webtoon')
  async initAllNaverWebtoon() {
    const currentWebtoons = await this.naverCrawlerService.cralwingCurrentWebtoonBase();
    const endWebtoons = await this.naverCrawlerService.crawlingEndWebtoonBase();
    await this.webtoonRepository.save([...currentWebtoons, ...endWebtoons]);
  }

  @Get('init/naver/chapter')
  async initAllNaverWebtoonChapter() {
    // const webtoons = await this.webtoonRepository.find({ select: ['titleId', 'id'] });
    // let i = 1;
    // for await (const webtoon of webtoons) {
    //   const chapters = await this.naverCrawlerService.crawlingChapters(webtoon.titleId);
    //   await this.chapterRepository.save(chapters.map((chapter) => ({ ...chapter, webtoonId: webtoon.id })));
    //   console.log(`${i}째 웹툰 Chapters save 완료`);
    //   i += 1;
    // }
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
