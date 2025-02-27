import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({
    summary: '장르 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: ['로맨스', '판타지', '드라마', '스릴러', '액션', '코미디'],
    },
  })
  async getGenres() {
    return await this.genresService.getGenres();
  }
}
