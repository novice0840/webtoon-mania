import { ApiProperty } from '@nestjs/swagger';
import { GetWebtoonDTO } from './GetWebtoon.dto';

export class GetWebtoonsDTO {
  @ApiProperty({
    type: [GetWebtoonDTO],
    description: '웹툰 목록',
  })
  webtoons: GetWebtoonDTO[];

  @ApiProperty({
    description: '현재 페이지',
    example: 1,
  })
  curPage: number;

  @ApiProperty({
    description: '총 페이지 수',
    example: 10,
  })
  totalPage: number;

  @ApiProperty({
    description: '총 웹툰 수',
    example: 100,
  })
  totalCount: number;
}
