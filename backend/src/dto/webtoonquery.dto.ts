import { IsString } from 'class-validator';

export class WebtoonQueryDTO {
  @IsString()
  titleId: string;

  @IsString()
  platform: string;
}
