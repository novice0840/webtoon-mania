import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GetGenresDTO {
  @ApiProperty({
    type: [String],
    example: ['드라마', '순정', '판타지', '로맨스', 'BL'],
  })
  @IsArray({ message: '플랫폼 목록은 문자열 배열이어야 합니다.' })
  @IsString({ each: true, message: '각 플랫폼은 문자열이어야 합니다.' })
  platforms;
}
