import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebtoonModule } from './webtoon/webtoon.module';

@Module({
  imports: [WebtoonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}