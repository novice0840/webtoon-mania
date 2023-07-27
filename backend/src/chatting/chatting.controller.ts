import { Controller, Get } from '@nestjs/common';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly chattingService: ChattingService) {}

  @Get()
  getUser(): string {
    return 'get user information';
  }
}
