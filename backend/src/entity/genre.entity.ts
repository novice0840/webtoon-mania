import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.genres)
  webtoon: Webtoon;
}
