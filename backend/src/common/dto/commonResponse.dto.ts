import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDTO<T = null> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: '요청이 성공적으로 처리되었습니다.' })
  message: string;

  @ApiProperty({ nullable: true })
  data: T;
}

export type CommonResponseType<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};
