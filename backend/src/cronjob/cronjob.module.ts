import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CronjobController } from './cronjob.controller';
import { CrawlerModule } from 'src/crawler/crawler.module';

@Module({
  imports: [CrawlerModule],
  providers: [CronjobService],
  controllers: [CronjobController],
})
export class CronjobModule {}
