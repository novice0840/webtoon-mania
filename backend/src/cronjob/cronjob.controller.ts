import { Controller, Get } from '@nestjs/common';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';
import { KakaoCrawlerService } from 'src/crawler/kakaocrawler.service';
import { LezhinCrawlerService } from 'src/crawler/lezhincrawler.service';
import { ToptoonCrawlerService } from 'src/crawler/toptooncrawler.service';
import { ToomicsCrawlerService } from 'src/crawler/toomicscralwer.service';
import { Webtoon } from 'src/entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@Controller('cronjob')
@ApiTags('cronjob')
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
    const s3Client = new S3Client({});
    const fileContent = fs.readFileSync(
      'https://image-comic.pstatic.net/webtoon/244245/thumbnail/thumbnail_IMAG21_7004844983486406968.jpg',
    );
    // Put an object into an Amazon S3 bucket.
    const bucketName = 'webtoon-mania';
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: 'sample/my-first-object.jpg',
        Body: fileContent,
      }),
    );

    return 'test';
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
