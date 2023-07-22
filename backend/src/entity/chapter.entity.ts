import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Chapter {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  webtoon_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 0 })
  average_star: number;

  @Column({ default: 0 })
  total_star: number;

  @Column({ type: 'date', nullable: true })
  upload_date: string;

  @Column({ default: 0 })
  star_score: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  comment_number: number;

  @Column({ nullable: true })
  like_count: number;

  @ManyToOne((type) => Webtoon, (webtoon) => webtoon.id)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
