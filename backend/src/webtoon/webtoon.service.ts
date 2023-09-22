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

  async getWebtoonList({ page, platform, isEnd, tags, days }: WebtoonListQueryDTO) {
    const limit = 50;
    const totalPage = Math.ceil(
      (await this.webtoonRepository.count({
        where: {
          platform,
          isEnd,
          genres: { tag: tags?.split(',') ? In(tags.split(',')) : undefined },
          dayOfWeeks: { day: days?.split(',') ? In(days.split(',')) : undefined },
        },
      })) / limit,
    );
    const data = await this.webtoonRepository.find({
      select: ['id', 'titleId', 'titleName', 'thumbnail', 'isEnd'],
      order: { id: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
      relations: ['genres', 'dayOfWeeks', 'authors'],
      where: {
        platform,
        isEnd,
        genres: { tag: tags?.split(',') ? In(tags.split(',')) : undefined },
        dayOfWeeks: { day: days?.split(',') ? In(days.split(',')) : undefined },
      },
    });
    return {
      info: { totalPage, page },
      data: data.map((element) => ({
        ...element,
        genres: element.genres.map((element) => element.tag),
        dayOfWeeks: element.dayOfWeeks.map((element) => element.day),
        authors: element.authors.map((element) => element.name),
      })),
    };
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
