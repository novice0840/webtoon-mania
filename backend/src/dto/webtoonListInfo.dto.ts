import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class WebtoonListInfoDTO {
  @IsInt()
  totalPage: number;

  @IsInt()
  page: number;
}
