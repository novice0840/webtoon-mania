import { Controller, Get } from '@nestjs/common';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('/all')
  getAllWebtoons() {
    return this.webtoonService.getAllWebtoons();
  }
}
