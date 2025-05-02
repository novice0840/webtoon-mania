import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDTO {
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
    description: '사용자의 비밀번호 (최소 8자 이상)',
    required: true,
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호를 최소 8자 이상 입력해주세요.' })
  password: string;
}
