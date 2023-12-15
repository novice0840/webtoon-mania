import { Controller, Get, Post, Delete, UseGuards, Request, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JwtGetCommentGuard } from './guard/getComment.guard';
import { User } from './../entity/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 특정 웹툰의 댓글 보기
  @Get('webtoon/:webtoonId')
  @UseGuards(JwtGetCommentGuard)
  getWebtoonComments(@Param('webtoonId') webtoonId, @Request() req) {
    return this.commentService.getWebtoonComments(webtoonId, req.user);
  }

  // 내 댓글 보기
  @Get('my')
  @UseGuards(JwtAuthGuard)
  getUserComments(@Request() req) {
    return this.commentService.getUserComments(req.user.id);
  }

  // 댓글 쓰기
  @Post('webtoon/:webtoonId')
  @UseGuards(JwtAuthGuard)
  createComment(@Body('content') content: string, @Request() req, @Param('webtoonId') webtoonId) {
    return this.commentService.createComment(req.user.id, webtoonId, content);
  }

  // 댓글을 삭제하는 기능 자기 자신의 댓글만 삭제 가능
  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  deleteComment(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.deleteComment(req.user.id, commentId);
  }

  // 좋아요 버튼을 눌렀을 때s
  @Post('like/:commentId')
  @UseGuards(JwtAuthGuard)
  clickLikeButton(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.clickLiketButton(req.user.id, commentId);
  }

  // 싫어요 버튼을 눌렀을 때
  @Post('dislike/:commentId')
  @UseGuards(JwtAuthGuard)
  clickDislikeButton(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.clickDislikstButton(req.user.id, commentId);
  }
}
