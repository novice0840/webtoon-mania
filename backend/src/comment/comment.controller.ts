import { Controller, Get, Post, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment() {
    return 'get user information';
  }

  // 특정 웹툰의 댓글을 보는 기능
  @Get('webtoon/:webtoonId')
  getWebtoonComments() {
    return 'geting comments';
  }

  // 자신이 쓴 댓글 목록을 보는 기능
  @Get('user/:userId')
  getUserComments() {
    return 'reading comments';
  }

  @Post('like')
  clickLike() {
    return 'click like';
  }

  @Post('dislike')
  clickDislike() {
    return 'click like';
  }

  @Delete(':commentId')
  deleteComment() {
    return 'delete comment';
  }
}
