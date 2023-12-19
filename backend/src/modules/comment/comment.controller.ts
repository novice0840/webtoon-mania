import { Controller, Get, Post, Delete, UseGuards, Request, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtGetCommentGuard } from 'src/guards/getComment.guard';
import { User } from '../../entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { UserId } from 'src/decorators/userId.decorator';
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('webtoon/:webtoonId')
  @UseGuards(JwtGetCommentGuard)
  @ApiOkResponse({ description: '특정 웹툰의 댓글 보기 성공' })
  getWebtoonComments(@Param('webtoonId') webtoonId, @Request() req) {
    return this.commentService.getWebtoonComments(webtoonId, req.user);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiOkResponse({ description: ' 내 댓글 보기 성공' })
  getUserComments(@UserId() id) {
    return this.commentService.getUserComments(id);
  }

  @Post('webtoon/:webtoonId')
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiCreatedResponse({ description: '댓글 쓰기 성공' })
  createComment(@Body('content') content: string, @UserId() id, @Param('webtoonId') webtoonId) {
    return this.commentService.createComment(id, webtoonId, content);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiNoContentResponse({ description: '댓글 삭제 성공' })
  deleteComment(@Param('commentId') commentId: string, @UserId() id) {
    return this.commentService.deleteComment(id, commentId);
  }

  @Post('like/:commentId')
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiOkResponse({ description: '좋아요 버튼 클릭 성공' })
  clickLikeButton(@Param('commentId') commentId: string, @UserId() id) {
    return this.commentService.clickLiketButton(id, commentId);
  }

  @Post('dislike/:commentId')
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiOkResponse({ description: '싫어요 버튼 클릭 성공' })
  clickDislikeButton(@Param('commentId') commentId: string, @UserId() id) {
    return this.commentService.clickDislikstButton(id, commentId);
  }
}
