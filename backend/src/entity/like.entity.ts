import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'comment_id' })
  commentId: string;

  @ManyToOne(() => User, (User) => User.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, (Comment) => Comment.likes)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;
}
