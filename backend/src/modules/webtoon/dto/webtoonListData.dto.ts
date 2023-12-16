import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { WebtoonDetailDTO } from './webtoonDetail.dto';

export class WebtoonListDataDTO extends PickType(WebtoonDetailDTO, [
  'titleId',
  'titleName',
  'thumbnail',
  'authors',
] as const) {}
