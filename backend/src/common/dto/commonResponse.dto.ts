import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto<T = unknown> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: '요청이 성공적으로 처리되었습니다.' })
  message: string;

  @ApiProperty()
  data: T;
}
