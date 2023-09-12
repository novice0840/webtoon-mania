import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class DayOfWeek {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column({ name: 'webtoon_id' })
  webtoonId: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.dayOfWeeks)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
