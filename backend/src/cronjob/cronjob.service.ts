import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Webtoon } from 'src/entity/webtoon.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { NaverCrawlerService } from 'src/crawler/navercrawler.service';

@Injectable()
export class CronjobService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Chapter) private chapterRepository: Repository<Chapter>,
    @Inject(NaverCrawlerService)
    private readonly naverCrawlerService: NaverCrawlerService,
  ) {}

  // async initAll() {
  //   await this.initDayOfWeek('MONDAY');
  //   await this.initDayOfWeek('TUESDAY');
  //   await this.initDayOfWeek('WEDNESDAY');
  //   await this.initDayOfWeek('THURSDAY');
  //   await this.initDayOfWeek('FRIDAY');
  //   await this.initDayOfWeek('SATURDAY');
  //   await this.initDayOfWeek('SUNDAY');
  // }

  // async initDayOfWeek(dayOfWeek) {
  //   const savedWebtoons = await this.webtoonRepository.find({
  //     select: ['id'],
  //     where: { dayOfWeek: Like(`%${dayOfWeek}%`) },
  //   });
  //   const chapters = await this.naverCrawlerService.crawlingChapter(
  //     savedWebtoons,
  //   );
  //   return await this.updateChapters(chapters);
  // }

  // async initWebtoon(webtoonId) {
  //   return webtoonId;
  // }

  // private updateWebtoons = async (webtoons) => {
  //   const changedWebtoons = webtoons.map((webtoon) => ({
  //     ...webtoon,
  //     tags: JSON.stringify(webtoon.tags),
  //     dayOfWeek: JSON.stringify(webtoon.dayOfWeek),
  //   }));
  //   return this.webtoonRepository.save([...changedWebtoons]);
  // };

  // private updateChapters = async (chapters) => {
  //   const changedChapters = chapters.map((chapter) => ({
  //     ...chapter,
  //     uploadDate: `20${chapter.uploadDate.split('.')[0]}-${
  //       chapter.uploadDate.split('.')[1]
  //     }-${chapter.uploadDate.split('.')[2]}`,
  //   }));
  //   return this.chapterRepository.save([...changedChapters]);
  // };

  // @Cron('0 30 11 * * *')
  // async crawlingScheduler() {
  //   const date = new Date();
  //   const today = date.getDay();
  //   let webtoons;
  //   if (today === 0) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'SUNDAY',
  //     );
  //   } else if (today === 1) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'MONDAY',
  //     );
  //   } else if (today === 2) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'TUESDAY',
  //     );
  //   } else if (today === 3) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'WEDNESDAY',
  //     );
  //   } else if (today === 4) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'THURSDAY',
  //     );
  //   } else if (today === 5) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'FRIDAY',
  //     );
  //   } else if (today === 6) {
  //     webtoons = await this.naverCrawlerService.crawlingCurrentWebtoon(
  //       'SATURDAY',
  //     );
  //   }
  //   await this.updateWebtoons(webtoons);
  //   const chapters = await this.naverCrawlerService.crawlingRecentChapter(
  //     webtoons,
  //   );
  //   await this.updateChapters(chapters);
  // }
}
