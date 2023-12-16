import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  Max,
  IsString,
  IsUUID,
  IsUrl,
  Min,
  IsFQDN,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';

export class WebtoonDetailDTO {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  titleId: string;

  @IsString()
  platform: string;

  @IsString()
  titleName: string;

  @IsFQDN()
  thumbnail: string;

  @IsInt()
  @Min(0)
  interestCount: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  starScore: number;

  @IsString()
  description;

  @IsInt()
  @Min(0)
  viewCount;

  @IsInt()
  @Min(0)
  likeCount;

  @IsBoolean()
  isEnd;

  @IsFQDN()
  link;

  @IsArray()
  genres: string[];

  @IsArray()
  dayOfWeeks: string[];

  @IsArray()
  authors: string[];
}
