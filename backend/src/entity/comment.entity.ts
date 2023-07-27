import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import Webtoon from './webtoon.entity';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  writer_id: string;

  @Column()
  webtoon_id: number;

  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'writer_id' })
  user: User;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.comments)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
