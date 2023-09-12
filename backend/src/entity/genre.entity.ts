import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @Column({ name: 'webtoon_id' })
  webtoonId: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.genres)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
