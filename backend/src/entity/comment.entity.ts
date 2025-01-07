import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Webtoon } from './webtoon.entity';
import { Like } from './like.entity';
import { Dislike } from './dislike.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'writer_id' })
  writerId: string;

  @Column({ name: 'webtoon_id' })
  webtoonId: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'writer_id' })
  user: User;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  likes: Like[];

  @OneToMany(() => Dislike, (DisLike) => DisLike.user, { cascade: true })
  dislikes: Dislike[];
}
