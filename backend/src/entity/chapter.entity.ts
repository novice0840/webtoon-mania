import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Chapter {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: number;

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

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.id)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
