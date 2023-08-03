import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Chatting, Like, Dislike, User } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chatting, Like, Dislike, User])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
