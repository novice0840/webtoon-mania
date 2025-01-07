import { Module } from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { ChattingController } from './chatting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatting, Like, Dislike } from 'src/entity';
import { ChattingGateway } from './chatting.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Chatting, Like, Dislike])],
  providers: [ChattingService, ChattingGateway],
  controllers: [ChattingController],
})
export class ChattingModule {}
