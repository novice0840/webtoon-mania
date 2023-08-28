import { IsNotEmpty } from 'class-validator';

export class WebtoonsQueryDTO {
  @IsNotEmpty()
  page = 1;

  @IsNotEmpty()
  platform = 'all';
}
