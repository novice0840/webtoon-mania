import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  webtoonId: number;

  @IsString()
  content: string;
}
