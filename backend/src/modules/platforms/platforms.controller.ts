import { Controller, Get } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { GetPlatformsSwagger } from 'src/common/decorators/swagger/getPlatforms.decorator';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformService: PlatformsService) {}

  @Get()
  @GetPlatformsSwagger()
  async getPlatforms() {
    return await this.platformService.getPlatforms();
  }
}
