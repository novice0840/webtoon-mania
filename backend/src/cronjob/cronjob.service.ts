import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { crawlingWebtoon, crawlingChapter } from './crawler';
@Injectable()
export class CronjobService {
  constructor(private readonly datasource: DataSource) {}

  async test() {
    const webtoons = await crawlingWebtoon('WEDNESDAY');
    await this.updateWebtoons(webtoons);
    const chapters = await crawlingChapter(webtoons);
    await this.updateChapters(chapters);
  }

  private updateWebtoons = async (webtoons) => {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    try {
      let i = 1;
      for await (const webtoon of webtoons) {
        await queryRunner.manager.query(`
            INSERT INTO webtoon (id, title, author, day_of_week, thumbnail, interest_count, star_score, description, tags)
            VALUES (${webtoon.id},"${webtoon.title}", "${
          webtoon.author
        }", '${JSON.stringify(webtoon.dayOfWeek)}', "${webtoon.thumbnail}", 
            ${webtoon.interestCount}, ${webtoon.starScore}, '${
          webtoon.description
        }', '${JSON.stringify(webtoon.tags)}')
            ON DUPLICATE KEY UPDATE title="${webtoon.title}", author="${
          webtoon.author
        }", day_of_week='${JSON.stringify(webtoon.dayOfWeek)}', thumbnail="${
          webtoon.thumbnail
        }", interest_count=${webtoon.interestCount}, star_score=${
          webtoon.starScore
        }, description="${webtoon.description}", tags='${JSON.stringify(
          webtoon.tags,
        )}';
            `);
        console.log(`웹툰 ${i}개 update 완료`);
        i += 1;
      }
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
  async handleCron() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    const date = new Date();
    const today = date.getDay();
    let webtoons;
    if (today === 0) {
      webtoons = crawlingWebtoon('SUNDAY');
    } else if (today === 1) {
      webtoons = crawlingWebtoon('MONDAY');
    } else if (today === 2) {
      webtoons = crawlingWebtoon('TUESDAY');
    } else if (today === 3) {
      webtoons = crawlingWebtoon('WEDNESDAY');
    } else if (today === 4) {
      webtoons = crawlingWebtoon('THURSDAY');
    } else if (today === 5) {
      webtoons = crawlingWebtoon('FRIDAY');
    } else if (today === 6) {
      webtoons = crawlingWebtoon('SATURDAY');
    }
    await this.updateWebtoons(webtoons);
    const chapters = await crawlingChapter(webtoons);
    await this.updateChapters(chapters);
  }
}
