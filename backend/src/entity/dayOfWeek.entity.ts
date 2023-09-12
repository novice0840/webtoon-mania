import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, PrimaryColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class DayOfWeek {
  @PrimaryColumn()
  day: string;

  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.dayOfWeeks)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
