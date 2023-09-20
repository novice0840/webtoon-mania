import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class WebtoonListQueryDTO {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  page = 1;

  @ApiProperty({ description: '플랫폼 종류' })
  @IsOptional()
  platform: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isEnd: boolean;

  @ApiPropertyOptional({ description: '단일 값인 경우는 값 그대로 장르가 여러개면 ,를 붙인다. 예) 로맨스,액션' })
  @IsOptional()
  tags: string;

  @ApiPropertyOptional({ description: '단일 값인 경우는 값 그대로 요일이 여러개면 ,를 붙인다. 예) Monday,Thuesday' })
  @IsOptional()
  days: string;
}
