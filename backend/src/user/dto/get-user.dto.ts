import { IsString, IsEmail } from 'class-validator';

export class GetUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
