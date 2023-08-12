import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity/webtoon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
  ) {}

  getAllWebtoon() {
    return this.webtoonRepository.find();
  }

  getOneWebtoon(id) {
    return this.webtoonRepository.findOne({
      where: { id },
      relations: ['chapters'],
    });
  }
}
