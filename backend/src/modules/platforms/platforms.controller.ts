import { Controller, Get } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformService: PlatformsService) {}

  @Get()
  @ApiOperation({
    summary: '플랫폼 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: [
        '네이버웹툰',
        '카카오페이지',
        '다음웹툰',
        '레진코믹스',
        '코미코',
      ],
    },
  })
  async getPlatforms() {
    return await this.platformService.getPlatforms();
  }
}
