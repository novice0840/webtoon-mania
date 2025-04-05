import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GetGenresSwagger } from 'src/common/decorators/swagger/getGenres.decorator';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @GetGenresSwagger()
  async getGenres() {
    return await this.genresService.getGenres();
  }
}
