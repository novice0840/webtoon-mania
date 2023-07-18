import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(private readonly datasource: DataSource) {}

  async getAllWebtoon() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    let webtoonList;
    try {
      const data = await queryRunner.manager.query(
        'select id,title,author,day_of_week,thumbnail,interest_count,star_score,tags from webtoon_base_info;',
      );
      webtoonList = data.map((webtoon) => ({
        id: webtoon.id,
        title: webtoon.title,
        author: webtoon.author,
        dayOfWeek: JSON.parse(webtoon.day_of_week),
        thumbnail: webtoon.thumbnail,
        interestCount: webtoon.interest_count,
        starScore: webtoon.star_score,
        tags: JSON.parse(webtoon.tags),
      }));
    } catch (err) {
      console.log(err);
    } finally {
      await queryRunner.release();
    }
    return webtoonList;
  }

  async getOneWebtoon(id) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    let webtoon;
    try {
      let data = await queryRunner.manager.query(
        `select * from webtoon_base_info where id=${id}`,
      );
      webtoon = {
        id: data[0].id,
        title: data[0].title,
        author: data[0].author,
        dayOfWeek: JSON.parse(data[0].day_of_week),
        thumbnail: data[0].thumbnail,
        interestCount: data[0].interestCount,
        starScore: data[0].star_score,
        description: data[0].description,
        tags: JSON.parse(data[0].tags),
        chapters: [],
      };
      data = await queryRunner.manager.query(
        `select id,name,average_star,total_star,thumbnail,upload_date from webtoon_chapter_info where webtoon_id=${id}`,
      );
      webtoon.chapters = data.map((chapter) => ({
        id: chapter.id,
        name: chapter.name,
        averageStar: chapter.average_star,
        totalStar: chapter.total_star,
        thumbnail: chapter.thumbnail,
        uploadDate: new Date(chapter.upload_date).toISOString().split('T')[0],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      await queryRunner.release();
    }
    return webtoon;
  }
}
