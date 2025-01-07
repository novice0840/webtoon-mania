import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly chattingService: ChattingService) {}
}
