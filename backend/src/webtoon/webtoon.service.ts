import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity/webtoon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  async getWebtoonAll(page: number, platform: string) {
    const limit = 100;
    let totalPage;
    let webtoons;
    if (platform === 'all') {
      totalPage = Math.ceil((await this.webtoonRepository.count()) / 50);
      webtoons = await this.webtoonRepository.find({ order: { id: 'ASC' }, take: limit, skip: (page - 1) * limit });
    } else {
      totalPage = Math.ceil((await this.webtoonRepository.count({ where: { platform } })) / 50);
      webtoons = await this.webtoonRepository.find({
        order: { id: 'ASC' },
        take: limit,
        skip: (page - 1) * limit,
        where: { platform },
      });
    }
    return { info: { totalPage, page }, data: webtoons };
  }

  getOneWebtoon(titleId, platform) {
    return this.webtoonRepository.findOne({
      where: { titleId, platform },
      relations: ['chapters'],
    });
  }
}
