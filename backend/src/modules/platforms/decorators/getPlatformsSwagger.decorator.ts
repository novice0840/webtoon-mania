import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponseDTO } from 'src/common/DTO/commonResponse.DTO';
import { GetPlatformsDTO } from 'src/modules/platforms/dto/GetPlatforms.dto';

export function GetPlatformsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '플랫폼 목록 조회',
    }),
    ApiExtraModels(CommonResponseDTO, GetPlatformsDTO),
    ApiOkResponse({
      description: '플랫폼 목록 조회 성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponseDTO) },
          {
            properties: {
              data: { $ref: getSchemaPath(GetPlatformsDTO) },
            },
          },
        ],
      },
    }),
  );
}
