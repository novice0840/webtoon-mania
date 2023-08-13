import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Chapter } from './chapter.entity';
import { Comment } from './comment.entity';

@Entity()
@Unique(['code', 'platform'])
export class Webtoon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column('json')
  author: string[];

  @Column('json', { name: 'day_of_week', nullable: true })
  dayOfWeek: string[];

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ name: 'interest_count', nullable: true })
  interestCount: number;

  @Column({ name: 'star_score', nullable: true })
  starScore: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column()
  platform: string;

  @Column({ name: 'view_count', nullable: true })
  viewCount: string;

  @Column({ name: 'like_count', nullable: true })
  likeCount: number;

  @Column({ name: 'is_end' })
  isEnd: boolean;

  @Column()
  link: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: string;

  @OneToMany(() => Chapter, (chapter) => chapter.webtoon)
  chapters: Chapter[];

  @OneToMany(() => Comment, (comment) => comment.webtoon)
  comments: Comment[];
}
