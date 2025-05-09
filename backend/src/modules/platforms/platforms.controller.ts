import { Controller, Get } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { GetPlatformsSwagger } from './decorators/getPlatformsSwagger.decorator';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  @GetPlatformsSwagger()
  async getPlatforms() {
    const platforms = await this.platformsService.getPlatforms();
    return {
      success: true,
      message: '플랫폼 목록 응답 성공',
      data: { platforms },
    };
  }
}
