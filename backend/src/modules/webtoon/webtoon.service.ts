import { Injectable } from '@nestjs/common';
import { Webtoon, Genre, DayOfWeek, Author } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WebtoonListQueryDTO } from 'src/modules/webtoon/dto';
import { DataSource } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Webtoon) private genreRepository: Repository<Genre>,
    @InjectRepository(Webtoon) private dayOfWeekRepository: Repository<DayOfWeek>,
    @InjectRepository(Webtoon) private authorRepository: Repository<Author>,
    private dataSource: DataSource,
  ) {}

  async getWebtoonList({ page, platform, genres, dayOfWeeks, isEnd }) {
    const limit = 50;
    let queryFilter = ``;
    if (platform !== 'all') {
      queryFilter += ` and platform='${platform}'`;
    }

    if (isEnd === 'true') {
      queryFilter += ` and is_end=true`;
    } else if (isEnd === 'false') {
      queryFilter += ` and is_end=false`;
    }

    if (typeof genres === 'object') {
      genres.forEach((genre) => {
        queryFilter += ` and id in (select webtoon_id from genre where tag='${genre}')`;
      });
    }

    if (typeof dayOfWeeks === 'object') {
      dayOfWeeks.forEach((dayOfWeek) => {
        queryFilter += ` and id in (select webtoon_id from day_of_week where day='${dayOfWeek}')`;
      });
    }

    const { totalCount } = (
      await this.dataSource.query(`select count(*) as totalCount from webtoon where 1=1 ${queryFilter}`)
    )[0];

    const totalPage = Math.ceil(totalCount / limit);

    const data = await this.dataSource.query(
      `select webtoon.id as id, 
      webtoon.title_name as titleName, 
      webtoon.thumbnail as thumbnail, 
      group_concat(author.name) as authors 
      from webtoon left join author on webtoon.id = author.webtoon_id 
       where 1=1  ${queryFilter}  group by webtoon.id limit ${limit} offset ${(page - 1) * limit}`,
    );
    return { info: { totalPage, page }, data };
  }

  async getOneWebtoon(id) {
    const data = await this.webtoonRepository.findOne({
      where: { id },
      relations: ['genres', 'dayOfWeeks', 'authors'],
    });

    return {
      ...data,
      genres: data.genres.map((element) => element.tag),
      dayOfWeeks: data.dayOfWeeks.map((element) => element.day),
      authors: data.authors.map((element) => element.name),
    };
  }

  async getWebtoonKinds() {
    return (
      await this.dataSource.query(`select tag as genre from genre group by tag order by count(tag) desc limit 50;`)
    ).map((element) => element.genre);
  }
}
