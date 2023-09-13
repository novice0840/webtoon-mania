import { Controller, Get } from '@nestjs/common';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { KakaoCrawlerService } from 'src/crawler/kakaocrawler.service';
import { LezhinCrawlerService } from 'src/crawler/lezhincrawler.service';
import { ToptoonCrawlerService } from 'src/crawler/toptooncrawler.service';
import { ToomicsCrawlerService } from 'src/crawler/toomicscralwer.service';
import { Webtoon } from 'src/entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('cronjob')
export class CronjobController {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,

    private readonly lezhinCrawlerService: LezhinCrawlerService,
    private readonly toptoonCrawlerService: ToptoonCrawlerService,
    private readonly toomicsCrawlerService: ToomicsCrawlerService,
    private readonly naverCrawlerService: NaverCrawlerService,
    private readonly kakaoCrawlerService: KakaoCrawlerService,
  ) {}

  @Get('test')
  async test() {
    const samplewebtoon = {
      titleId: 'hello',
      platform: 'naver',
      titleName: 'hello',
      isEnd: false,
      link: 'www.naver.com',
      genres: [{ tag: 'tag1' }, { tag: 'tag2' }],
    };
    return this.webtoonRepository.save(samplewebtoon);
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
