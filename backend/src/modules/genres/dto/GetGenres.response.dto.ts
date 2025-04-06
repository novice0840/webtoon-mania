import { ApiProperty } from '@nestjs/swagger';

export class GetGenresResponseDTO {
  @ApiProperty({
    type: [String],
    example: ['드라마', '순정', '판타지', '로맨스', 'BL'],
  })
  platforms: string[];
}
