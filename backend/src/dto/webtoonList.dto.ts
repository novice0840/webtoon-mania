import { ValidateNested } from 'class-validator';
import { WebtoonListInfoDTO } from './webtoonListInfo.dto';
import { WebtoonListDataDTO } from './webtoonListData.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WebtoonListDTO {
  @ApiProperty()
  @ValidateNested()
  info: WebtoonListInfoDTO;

  @ApiProperty()
  @ValidateNested()
  data: WebtoonListDataDTO[];
}
