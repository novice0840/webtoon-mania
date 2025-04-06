import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GetGenresSwagger } from './decorators/getGenresSwagger.decorator';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @GetGenresSwagger()
  async getGenres() {
    const genres = await this.genresService.getGenres();
    return {
      success: true,
      message: '장르 목록 응답 성공',
      data: { genres },
    };
  }
}
