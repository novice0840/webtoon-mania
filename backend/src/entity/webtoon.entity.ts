import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Comment } from './comment.entity';

@Entity()
export class Webtoon {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ name: 'day_of_week' })
  dayOfWeek: string;

  @Column()
  thumbnail: string;

  @Column({ name: 'interest_count' })
  interestCount: number;

  @Column({ name: 'star_score' })
  starScore: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  tags: string;

  @OneToMany(() => Chapter, (chapter) => chapter.webtoon)
  chapters: Chapter[];

  @OneToMany(() => Comment, (comment) => comment.webtoon)
  comments: Comment[];
}
