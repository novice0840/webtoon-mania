import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  webtoonId: string;

  @IsString()
  content: string;
}
