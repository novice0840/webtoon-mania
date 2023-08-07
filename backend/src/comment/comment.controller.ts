import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateCommentDto } from './dto/create-dto';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 특정 웹툰의 댓글 보기
  @Get('webtoon/:webtoonId')
  getWebtoonComments(@Param('webtoonId') webtoonId) {
    return this.commentService.getWebtoonComments(webtoonId);
  }

  // 내 댓글 보기
  @Get('my')
  getUserComments(@Request() req) {
    return this.commentService.getUserComments(req.user.id);
  }

  // 댓글 쓰기
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentService.createComment(
      req.user.id,
      createCommentDto.webtoonId,
      createCommentDto.content,
    );
  }

  // 댓글을 삭제하는 기능 자기 자신의 댓글만 삭제 가능
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.deleteComment(req.user.id, commentId);
  }

  // 좋아요 버튼을 눌렀을 때s
  @Post('like/:commentId')
  clickLikeButton(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.clickLiketButton(req.user.id, commentId);
  }

  // 싫어요 버튼을 눌렀을 때
  @Post('dislike/:commentId')
  clickDislikeButton(@Param('commentId') commentId: string, @Request() req) {
    return this.commentService.clickDislikstButton(req.user.id, commentId);
  }
}
