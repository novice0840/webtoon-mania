import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { WebtoonService } from './webtoon.service';

@Controller('webtoon')
export class WebtoonController {
  constructor(private readonly webtoonService: WebtoonService) {}

  @Get('')
  getAllWebtoons() {
    return this.webtoonService.getAllWebtoons();
  }
}
