import { IsString } from 'class-validator';

export class WebtoonDetailQueryDTO {
  @IsString()
  titleId: string;

  @IsString()
  platform: string;
}
