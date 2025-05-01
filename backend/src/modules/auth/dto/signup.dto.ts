import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @ApiProperty({
    type: String,
    example: 'sample@gmail.com',
  })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email;

  @ApiProperty({
    type: String,
    example: 'password1234!',
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호를 최소 8자 이상 입력해주세요.' })
  password;
}
