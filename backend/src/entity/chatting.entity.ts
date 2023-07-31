import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chatting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  writer_id: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.chattings)
  @JoinColumn({ name: 'writer_id' })
  user: User;
}
