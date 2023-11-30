import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, PrimaryColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Author {
  @PrimaryColumn()
  name: string;

  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.authors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
