import { ApiProperty } from '@nestjs/swagger';

export class GetPlatformsDTO {
  @ApiProperty({ type: [String], example: ['네이버', '카카오'] })
  platforms: string[];
}
