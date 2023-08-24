import { Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Comment } from './comment.entity';

@Entity()
@Unique(['titleId', 'platform'])
export class Webtoon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title_id' })
  titleId: string;

  @Column()
  platform: string;

  @Column({ name: 'title_name' })
  titleName: string;

  @Column('json')
  authors: string[];

  @Column('json', { name: 'day_of_weeks', nullable: true })
  dayOfWeeks: string[];

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ name: 'interest_count', nullable: true })
  interestCount: number;

  @Column({ type: 'float', name: 'star_score', nullable: true })
  starScore: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column({ name: 'view_count', nullable: true, default: 0 })
  viewCount: string;

  @Column({ name: 'like_count', nullable: true })
  likeCount: number;

  @Column({ name: 'is_end' })
  isEnd: boolean;

  @Column()
  link: string;

  @OneToMany(() => Chapter, (chapter) => chapter.webtoon)
  chapters: Chapter[];

  @OneToMany(() => Comment, (comment) => comment.webtoon)
  comments: Comment[];
}
