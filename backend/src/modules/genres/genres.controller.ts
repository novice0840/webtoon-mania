import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({
    summary: '장르 목록 조회',
  })
  async getGenres() {
    return await this.genresService.getGenres();
  }
}
