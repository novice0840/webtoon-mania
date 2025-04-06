import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto/commonResponse.dto';
import { GetPlatformsResponseDto } from 'src/modules/platforms/dto/GetPlatforms.response.dto';

export function GetPlatformsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '플랫폼 목록 조회',
    }),
    ApiExtraModels(CommonResponseDto, GetPlatformsResponseDto),
    ApiOkResponse({
      description: '플랫폼 목록 조회 성공',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(GetPlatformsResponseDto) },
            },
          },
        ],
      },
    }),
  );
}
