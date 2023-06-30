import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebtoonController } from './webtoon/webtoon.controller';
import { WebtoonModule } from './webtoon/webtoon.module';

@Module({
  imports: [WebtoonModule],
  controllers: [AppController, WebtoonController],
  providers: [AppService],
})
export class AppModule {}
