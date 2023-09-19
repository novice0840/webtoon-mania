import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity/webtoon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebtoonListQueryDTO } from 'src/dto';

@Injectable()
export class WebtoonService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  async getWebtoonList({ page, platform, isEnd, tags, days }: WebtoonListQueryDTO) {
    console.log(page, platform, isEnd, tags, days);
    const limit = 100;
    let totalPage;
    let webtoons;
    if (platform === 'all') {
      totalPage = Math.ceil((await this.webtoonRepository.count()) / 50);
      webtoons = await this.webtoonRepository.find({ order: { id: 'ASC' }, take: limit, skip: (page - 1) * limit });
    } else {
      totalPage = Math.ceil((await this.webtoonRepository.count({ where: { platform } })) / 50);
      webtoons = await this.webtoonRepository.find({
        select: ['id', 'titleId', 'titleName', 'thumbnail', 'isEnd'],
        order: { id: 'ASC' },
        take: limit,
        skip: (page - 1) * limit,
        where: { platform },
        relations: ['dayOfWeeks', 'authors'],
      });
    }
    return { info: { totalPage, page }, data: webtoons };
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
