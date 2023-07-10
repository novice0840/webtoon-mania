import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(private readonly datasource: DataSource) {}

  async getAllWebtoon() {
    const queryRunner = this.datasource.createQueryRunner();
    return queryRunner.manager.query('select * from webtoon_base_info;');
  }

  async getOneWebtoon(id) {
    const queryRunner = this.datasource.createQueryRunner();
    return queryRunner.manager.query(
      `select * from webtoon_chapter_info where webtoon_id=${id}`,
    );
  }
}
