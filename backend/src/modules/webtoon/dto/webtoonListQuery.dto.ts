import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumberString,
  IsString,
  IsEnum,
  IsBooleanString,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { PlatformType, DayOfWeekType } from 'src/types/webtoon';

export class WebtoonListQueryDTO {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNumber()
  page = 1;

  @IsEnum(['all', 'naver', 'kakao', 'toptoon', 'toomics', 'lezhin'])
  @IsOptional()
  @ApiProperty({ description: '플랫폼 종류', default: 'all' })
  platform = 'all';

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ description: '웹툰 장르' })
  genres: string[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }

    return value;
  })
  @IsArray()
  @IsEnum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], { each: true })
  @IsOptional()
  @ApiPropertyOptional({ description: '웹툰 연재 요일 ' })
  dayOfWeeks: DayOfWeekType[];

  @IsOptional()
  @IsBooleanString()
  @ApiPropertyOptional({ description: '완결 여부' })
  isEnd: string;
}
