import { Module } from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { ChattingController } from './chatting.controller';

@Module({
  providers: [ChattingService],
  controllers: [ChattingController],
})
export class ChattingModule {}
