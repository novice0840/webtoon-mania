import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    type: String,
    example: 'sample@gmail.com',
    description: '사용자의 이메일 주소',
    required: true,
  })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @ApiProperty({
    type: String,
    example: 'password1234!',
    description: '사용자의 비밀번호',
    required: true,
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  password: string;
}
