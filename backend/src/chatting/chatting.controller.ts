import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly chattingService: ChattingService) {}

  @Get(':webtoonId')
  getAllComments(): string {
    return 'get all commments';
  }

  @Post(':webtoonId')
  createComment() {
    return 'create comment';
  }

  @Delete(':commentId')
  deleteComment() {
    return 'delete comment';
  }

  @Post(':commentId')
  clickLikeButton() {
    return 'click like button';
  }

  @Post(':commentId')
  clickDislikeButton() {
    return 'click dislike button';
  }
}
