import { ApiProperty } from '@nestjs/swagger';

export class GetWebtoonsDTO {
  @ApiProperty({ example: '00031c1a-e23a-47a6-b0cc-8fed4ad8f351' })
  id: string;

  @ApiProperty({ example: '성애적 순애보' })
  title: string;

  @ApiProperty({ example: '유' })
  writer: string;

  @ApiProperty({ example: '명' })
  illustrator: string;

  @ApiProperty({ example: '로맨스' })
  genre: string;

  @ApiProperty({ example: '웹툰 줄거리 요약 텍스트' })
  synopsis: string;

  @ApiProperty({
    example:
      'https://storage.googleapis.com/webtoon-mania-bucket/thumbnails/sample.jpg',
  })
  thumbnailURL: string;
}
