import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity()
export class Chapter {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: string;

  @Column()
  name: string;

  @Column({ name: 'star_score', type: 'float' })
  starScore: number;

  @Column({ type: 'date', name: 'upload_date' })
  uploadDate: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.id)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
