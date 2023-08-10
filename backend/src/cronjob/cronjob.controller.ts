import { Controller, Get, Param } from '@nestjs/common';
import { CronjobService } from './cronjob.service';

@Controller('cronjob')
export class CronjobController {
  constructor(private readonly cronjobService: CronjobService) {}

  @Get('/init/all')
  initAll() {
    return this.cronjobService.initAll();
  }

  @Get('init/webtoons')
  initWebtoons() {
    return 'init all webtoon';
  }

  @Get('/init/dayofweek/:dayofweek')
  initDayOfWeek(@Param('dayofweek') dayofweek: string) {
    return this.cronjobService.initDayOfWeek(dayofweek);
  }

  @Get('/init/webtoon/:webtoonId')
  testWebtoon(@Param('webtoonId') webtoonId) {
    return this.cronjobService.initWebtoon(webtoonId);
  }
}
