import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  public async getGenres() {
    const genres = await this.prisma.webtoon.findMany({
      select: {
        genre: true,
      },
      where: {
        genre: {
          not: null,
        },
      },
      distinct: ['genre'],
    });

    return genres.map((g) => g.genre);
  }
}
