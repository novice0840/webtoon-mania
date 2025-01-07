import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Like, Dislike, User, Comment } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Dislike, User, Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
