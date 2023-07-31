import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import {
  crawlingWebtoon,
  crawlingChapter,
  crawlingRecentChapter,
} from './crawler';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Webtoon } from 'src/entity/webtoon.entity';
import { Chapter } from 'src/entity/chapter.entity';
@Injectable()
export class CronjobService {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Chapter) private chapterRepository: Repository<Chapter>,
  ) {}

  test() {
    const sample = {
      id: 1,
      title: 'sample',
      author: 'sample',
      thumbnail: 'sample',
      dayOfWeek: 'das',
      starScore: 1,
      tags: 'sample',
      description: 'sample',
      interestCount: 1,
    };
    return this.webtoonRepository.save([sample]);
  }

  async initAll() {
    await this.initDayOfWeek('MONDAY');
    await this.initDayOfWeek('TUESDAY');
    await this.initDayOfWeek('WEDNESDAY');
    await this.initDayOfWeek('THURSDAY');
    await this.initDayOfWeek('FRIDAY');
    await this.initDayOfWeek('SATURDAY');
    await this.initDayOfWeek('SUNDAY');
  }

  async initDayOfWeek(dayOfWeek) {
    const webtoons = await crawlingWebtoon(dayOfWeek);
    await this.updateWebtoons(webtoons);
    const chapters = await crawlingChapter(webtoons);
    await this.updateChapters(chapters);
  }

  async initWebtoon(webtoonId) {
    return webtoonId;
  }

  private updateWebtoons = async (webtoons) => {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    try {
      // let i = 1;
      const changedWebtoon = webtoons.map((webtoon) => ({
        ...webtoon,
        tags: JSON.stringify(webtoon.tags),
        dayOfWeek: JSON.stringify(webtoon.dayOfWeek),
      }));
      return this.webtoonRepository.save([changedWebtoon]);
      // for await (const webtoon of webtoons) {
      //   await queryRunner.manager.query(`
      //       INSERT INTO webtoon (id, title, author, day_of_week, thumbnail, interest_count, star_score, description, tags)
      //       VALUES (${webtoon.id},"${webtoon.title}", "${
      //     webtoon.author
      //   }", '${JSON.stringify(webtoon.dayOfWeek)}', "${webtoon.thumbnail}",
      //       ${webtoon.interestCount}, ${webtoon.starScore}, '${
      //     webtoon.description
      //   }', '${JSON.stringify(webtoon.tags)}')
      //       ON DUPLICATE KEY UPDATE title="${webtoon.title}", author="${
      //     webtoon.author
      //   }", day_of_week='${JSON.stringify(webtoon.dayOfWeek)}', thumbnail="${
      //     webtoon.thumbnail
      //   }", interest_count=${webtoon.interestCount}, star_score=${
      //     webtoon.starScore
      //   }, description="${webtoon.description}", tags='${JSON.stringify(
      //     webtoon.tags,
      //   )}';
      //       `);
      //   console.log(`웹툰 ${i}개 update 완료`);
      //   i += 1;
      // }
    } catch (err) {
      console.log(err);
    } finally {
      await queryRunner.release();
    }
    return webtoons;
  };

  private updateChapters = async (chapters) => {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    try {
      let i = 1;
      for await (const chapter of chapters) {
        const uploadDate = `20${chapter.uploadDate.split('.')[0]}-${
          chapter.uploadDate.split('.')[1]
        }-${chapter.uploadDate.split('.')[2]}`;
        await queryRunner.manager.query(`
        INSERT INTO chapter (id, webtoon_id, name, average_star, total_star, upload_date, thumbnail)
        VALUES (${chapter.id}, ${chapter.webtoonId}, "${chapter.name}", ${chapter.averageStar}, ${chapter.totalStar}, "${uploadDate}", "${chapter.thumbnail}")
        ON DUPLICATE KEY UPDATE name = "${chapter.name}", average_star=${chapter.averageStar}, total_star=${chapter.totalStar},thumbnail="${chapter.thumbnail}";
        `);
        console.log(`Chapter update ${i}개 완료`);
        i += 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  @Cron('0 30 11 * * *')
  async crawlingScheduler() {
    const date = new Date();
    const today = date.getDay();
    let webtoons;
    if (today === 0) {
      webtoons = await crawlingWebtoon('SUNDAY');
    } else if (today === 1) {
      webtoons = await crawlingWebtoon('MONDAY');
    } else if (today === 2) {
      webtoons = await crawlingWebtoon('TUESDAY');
    } else if (today === 3) {
      webtoons = await crawlingWebtoon('WEDNESDAY');
    } else if (today === 4) {
      webtoons = await crawlingWebtoon('THURSDAY');
    } else if (today === 5) {
      webtoons = await crawlingWebtoon('FRIDAY');
    } else if (today === 6) {
      webtoons = await crawlingWebtoon('SATURDAY');
    }
    await this.updateWebtoons(webtoons);
    const chapters = await crawlingRecentChapter(webtoons);
    await this.updateChapters(chapters);
  }
}
