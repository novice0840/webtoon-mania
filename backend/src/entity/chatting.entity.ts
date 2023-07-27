import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Chatting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  writer_id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.chatting)
  @JoinColumn({ name: 'writer_id' })
  user: User;
}
