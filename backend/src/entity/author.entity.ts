import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.authors)
  webtoon: Webtoon;
}
