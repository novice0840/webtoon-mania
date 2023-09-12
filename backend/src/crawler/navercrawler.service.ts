import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { naverCurrentWebtoonsURL } from 'src/constants';
import { Webtoon, Author, DayOfWeek, Genre } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NaverCrawlerService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(DayOfWeek) private dayOfWeekRepository: Repository<DayOfWeek>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async cralwingCurrentWebtoons() {
    const response = await axios.get(naverCurrentWebtoonsURL);
    const webtoons = Object.values(response.data.titleListMap)
      .flatMap((element) => element as any[])
      .filter((element) => !element.adult)
      .map((element) => ({
        titleId: String(element.titleId),
        titleName: element.titleName,
        thumbnail: element.thumbnailUrl,
        starScore: element.starScore,
        viewCount: element.viewCount,
        platform: 'naver',
        isEnd: false,
        link: `https://comic.naver.com/webtoon/list?titleId=${element.titleId}`,
      }));
    let i = 1;
    for await (const webtoon of webtoons) {
      const check = await this.webtoonRepository.find({ where: { titleId: webtoon.titleId, platform: 'naver' } });
      if (check.length != 0) {
        continue;
      }
      await this.webtoonRepository.save(webtoon);
      console.log(`Naver 연재 웹툰 ${i}개 크롤링 완료`);
      console.log(webtoon);
      i += 1;
    }
    return webtoons;
  }

  async crawlingEndWebtoons() {
    const response = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished`);
    const totalPageNumber = response.data.pageInfo.totalPages;
    let webtoonBases = [];
    const pageList = Array.from({ length: totalPageNumber }, (_, index) => index + 1);
    for await (const page of pageList) {
      const res = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished?page=${page}`);
      const pageWebtoons = res.data.titleList
        .filter((webtoon) => !webtoon.adult)
        .map((webtoon) => ({
          titleId: String(webtoon.titleId),
          titleName: webtoon.titleName,
          author: webtoon.author,
          starScore: webtoon.starScore,
          name: webtoon.titleName,
          thumbnail: webtoon.thumbnailUrl,
          viewCount: webtoon.viewCount,
          platform: 'naver',
          isEnd: true,
          link: `https://comic.naver.com/webtoon/list?titleId=${webtoon.titleId}`,
        }));
      webtoonBases = webtoonBases.concat(pageWebtoons);
    }

    const webtoons = [];
    let i = 1;
    for await (const webtoonBase of webtoonBases) {
      const detail = await this.cralwingWebtoonDetail(webtoonBase.titleId);
      const webtoon = { ...webtoonBase, ...detail };
      webtoons.push(webtoon);
      console.log(`네이버 완결 웹툰 ${i}개 크롤링 완료`);
      i = i + 1;
    }
    return webtoons;
  }

  async cralwingWebtoonDetail(titleId) {
    const response = await axios.get(`
      https://comic.naver.com/api/article/list/info?titleId=${titleId}`);
    const dayOfWeeks = response.data.publishDayOfWeekList.map(
      (day) => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
    );
    const tags = response.data.curationTagList.map((tag) => tag.tagName);
    const description = response.data.synopsis.replaceAll(/['"]/g, ' ');
    const interestCount = response.data.favoriteCount;
    const authorInfo: any[] = Object.values(response.data.author).flatMap((author) => author);
    const authorName = authorInfo.map((author) => author.name);
    return { dayOfWeeks, tags, description, interestCount, authors: authorName };
  }
}
