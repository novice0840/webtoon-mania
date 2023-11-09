import { Injectable } from '@nestjs/common';
import { Webtoon, Genre, DayOfWeek, Author } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WebtoonListQueryDTO } from 'src/dto';
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

    if (typeof genres === 'string') {
      queryFilter += ` and id in (select webtoon_id from genre where tag='${genres}')`;
    } else if (typeof genres === 'object') {
      genres.forEach((genre) => {
        queryFilter += ` and id in (select webtoon_id from genre where tag='${genre}')`;
      });
    }

    if (typeof dayOfWeeks === 'string') {
      queryFilter += ` and id in (select webtoon_id from day_of_week where day='${dayOfWeeks}')`;
    } else if (typeof dayOfWeeks === 'object') {
      dayOfWeeks.forEach((dayOfWeek) => {
        queryFilter += ` and id in (select webtoon_id from day_of_week where day='${dayOfWeek}')`;
      });
    }

    const totalCount = await this.dataSource.query(`select count(*) from webtoon where 1=1 ${queryFilter}`);

    const totalPage = Math.ceil(totalCount / limit);

    const data = await this.dataSource.query(
      `select * from webtoon where 1=1  ${queryFilter} limit ${limit} offset ${(page - 1) * limit}`,
    );
    return data;
  }

  async getOneWebtoon({ titleId, platform }) {
    const data = await this.webtoonRepository.findOne({
      where: { titleId, platform },
      relations: ['genres', 'dayOfWeeks', 'authors'],
    });
    return {
      ...data,
      genres: data.genres.map((element) => element.tag),
      dayOfWeeks: data.dayOfWeeks.map((element) => element.day),
      authors: data.authors.map((element) => element.name),
    };
  }
}
