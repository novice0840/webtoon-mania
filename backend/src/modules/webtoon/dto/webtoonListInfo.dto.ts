import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebtoonListInfoDTO {
  @IsInt()
  @ApiProperty()
  totalPage: number;

  @IsInt()
  @ApiProperty()
  page: number;
}
