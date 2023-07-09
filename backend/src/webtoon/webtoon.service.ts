import { Injectable } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';

@Injectable()
export class WebtoonService {
  constructor(private readonly datasource: DataSource) {}

  async getAllWebtoon() {
    const queryRunner = this.datasource.createQueryRunner();
    const res = await queryRunner.manager.query('select version()');
    console.log(res);
    return process.env.DATABASE_USER;
  }
}
