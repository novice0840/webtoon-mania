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
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  titleId: string;

  @IsString()
  @ApiProperty()
  platform: string;

  @IsString()
  @ApiProperty()
  titleName: string;

  @IsFQDN()
  @ApiProperty()
  thumbnail: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  interestCount: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty()
  starScore: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  viewCount: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  likeCount: number;

  @IsBoolean()
  @ApiProperty()
  isEnd: boolean;

  @IsFQDN()
  @ApiProperty()
  link: string;

  @IsArray()
  @ApiProperty()
  genres: string[];

  @IsArray()
  dayOfWeeks: string[];

  @IsArray()
  authors: string[];
}
