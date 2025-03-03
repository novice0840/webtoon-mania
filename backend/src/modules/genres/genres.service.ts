import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getGenres() {
    const genres = await this.prismaService.webtoon.groupBy({
      by: ['genre'],
      where: {
        genre: { not: null },
      },
      _count: {
        genre: true,
      },
      orderBy: {
        _count: {
          genre: 'desc',
        },
      },
    });

    return genres.map((g) => g.genre);
  }
}
