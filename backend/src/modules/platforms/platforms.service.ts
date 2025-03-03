import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlatformsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPlatforms() {
    const platformCount: Record<string, number> = {};
    const webtoonPlatforms = await this.prismaService.webtoonPlatform.findMany({
      include: {
        platform: true,
      },
    });

    webtoonPlatforms.forEach((webtoonPlatform) => {
      const platformName = webtoonPlatform.platform.name;
      if (platformName in platformCount) {
        platformCount[platformName] += 1;
      } else {
        platformCount[platformName] = 0;
      }
    });

    return Object.entries(platformCount)
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .map(([key]) => key);
  }
}
