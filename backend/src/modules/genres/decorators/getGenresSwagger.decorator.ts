import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponseDTO } from 'src/common/DTO/commonResponse.DTO';
import { GetGenresResponseDTO } from 'src/modules/genres/dto/GetGenres.response.dto';

export function GetGenresSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '장르 목록 조회',
    }),
    ApiExtraModels(CommonResponseDTO, GetGenresResponseDTO),
    ApiResponse({
      status: 200,
      description: '장르 목록 조회 성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponseDTO) },
          {
            properties: {
              data: { $ref: getSchemaPath(GetGenresResponseDTO) },
            },
          },
        ],
      },
    }),
  );
}
