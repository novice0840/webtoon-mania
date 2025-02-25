import { Module } from '@nestjs/common';
import { WebtoonsService } from './webtoons.service';
import { WebtoonsController } from './webtoons.controller';

@Module({
  providers: [WebtoonsService],
  controllers: [WebtoonsController],
})
export class WebtoonsModule {}
