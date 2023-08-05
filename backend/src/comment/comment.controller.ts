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

  // 댓글 쓰기
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentService.createComment(
      req.user,
      createCommentDto.webtoonId,
      createCommentDto.content,
    );
  }

  // 댓글을 삭제하는 기능 자기 자신의 댓글만 삭제 가능
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }

  // 좋아요 버튼을 눌렀을 때
  @Get('like/:commentId')
  clickLikeButton() {
    return 'click like button';
  }

  // 싫어요 버튼을 눌렀을 때
  @Get('dislike/:commentId')
  clickDislikeButton() {
    return 'click dislike button';
  }
}
