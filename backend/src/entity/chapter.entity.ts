import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Chapter {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  webtoon_id: number;

  @Column()
  name: string;

  @Column({ name: 'average_star', type: 'float' })
  averageStar: number;

  @Column({ name: 'total_star', type: 'float' })
  totalStar: number;

  @Column({ type: 'date', name: 'upload_date' })
  uploadDate: string;

  @Column()
  thumbnail: string;

  @Column({ name: 'like_count' })
  likeCount: number;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.id)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
