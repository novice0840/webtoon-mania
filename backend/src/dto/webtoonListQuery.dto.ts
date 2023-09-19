import { IsNotEmpty, IsOptional, IsInt, IsString, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class WebtoonListQueryDTO {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  page = 1;

  @ApiProperty({ description: '플랫폼 종류', default: 'all' })
  @IsString()
  platform = 'all';

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isEnd: boolean;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  days: string[];
}
