import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, PrimaryColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Genre {
  @PrimaryColumn()
  tag: string;

  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.genres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
