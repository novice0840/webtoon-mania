import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity/webtoon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
  ) {}

  async getAllWebtoon() {
    const allWebtoon = await this.webtoonRepository.find();
    return allWebtoon.map((webtoon) => ({
      ...webtoon,
      tags: JSON.parse(webtoon.tags),
      dayOfWeek: JSON.parse(webtoon.dayOfWeek),
    }));
  }

  async getOneWebtoon(id) {
    const webtoon = await this.webtoonRepository.findOne({
      where: { id },
      relations: ['chapters'],
    });
    console.log(webtoon);
    return {
      ...webtoon,
      tags: JSON.parse(webtoon.tags),
      dayOfWeek: JSON.parse(webtoon.dayOfWeek),
    };
  }
}
