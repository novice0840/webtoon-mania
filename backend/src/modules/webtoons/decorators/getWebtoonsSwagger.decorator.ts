import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponseDTO } from 'src/common/DTO/commonResponse.DTO';
import { GetWebtoonsDTO } from '../dto/GetWebtoons.response.dto';

export function GetWebtoonsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '웹툰 목록 조회',
    }),
    ApiExtraModels(CommonResponseDTO, GetWebtoonsDTO),
    ApiOkResponse({
      description: '웹툰 목록 조회 성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponseDTO) },
          {
            properties: {
              data: { $ref: getSchemaPath(GetWebtoonsDTO) },
            },
          },
        ],
      },
    }),
  );
}
