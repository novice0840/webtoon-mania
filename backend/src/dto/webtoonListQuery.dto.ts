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
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { PlatformType, DayOfWeekType } from 'src/types/webtoon';

export class WebtoonListQueryDTO {
  // @ApiProperty({ default: 1 })
  @IsNumberString()
  page = 1;

  @ApiProperty({ description: '플랫폼 종류', default: 'all' })
  @IsEnum(['naver', 'kakao', 'toptoon', 'toomics', 'lezhin'])
  @IsOptional()
  platform = 'all';

  @ApiPropertyOptional({ description: '웹툰 장르' })
  @IsOptional()
  genres: string | string[];

  @ApiPropertyOptional({ description: '웹툰 연재 요일 ' })
  @IsOptional()
  dayOfWeeks: DayOfWeekType | DayOfWeekType[];

  @ApiPropertyOptional({ description: '완결 여부' })
  @IsOptional()
  @IsString()
  isEnd: string;
}
