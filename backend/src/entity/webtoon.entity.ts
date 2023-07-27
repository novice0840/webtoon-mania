import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Chapter from './chapter.entity';
import Comment from './comment.entity';

@Entity()
export default class Webtoon {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  day_of_week: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ default: 0 })
  interest_count: number;

  @Column({ default: 0 })
  star_score: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  tags: string;

  @OneToMany(() => Chapter, (chapter) => chapter.webtoon)
  chapters: Chapter[];

  @OneToMany(() => Comment, (comment) => comment.webtoon)
  comments: Comment[];
}
