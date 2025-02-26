import { Controller, Get } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformService: PlatformsService) {}

  @Get()
  @ApiOperation({
    summary: '플랫폼 목록 조회',
  })
  async getPlatforms() {
    return await this.platformService.getPlatforms();
  }
}
