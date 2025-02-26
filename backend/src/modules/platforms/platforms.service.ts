import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlatformsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPlatforms() {
    return (await this.prismaService.platform.findMany()).map(
      ({ name }) => name,
    );
  }
}
