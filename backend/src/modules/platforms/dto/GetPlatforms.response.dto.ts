import { ApiProperty } from '@nestjs/swagger';

export class GetPlatformsResponseDTO {
  @ApiProperty({ type: [String], example: ['네이버', '카카오'] })
  platforms: string[];
}
