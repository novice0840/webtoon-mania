import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity({ name: 'Day_Of_Week' })
export class DayOfWeek {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.genres)
  webtoon: Webtoon;
}
