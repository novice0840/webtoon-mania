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

  async crawlingWebtoons() {
    await this.cralwingCurrentWebtoons();
    await this.crawlingEndWebtoons();
  }

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
      const check = await this.webtoonRepository.findOne({
        select: ['id', 'isEnd'],
        where: { titleId: webtoon.titleId, platform: 'naver' },
      });
      if (check?.id && !check.isEnd) {
        continue;
      } else if (check?.id && check.isEnd) {
        // 연재완료된 웹툰이 다시 시작한 경우
        await this.webtoonRepository.save({ id: check.id, ...webtoon });
      } else {
        // DB에 없는 새로운 웹툰
        const savedWebtoon = await this.webtoonRepository.save(webtoon);
        await this.cralwingWebtoonDetail(savedWebtoon.id);
      }
      console.log(`Naver 연재 웹툰 ${i}개 크롤링 완료`);
      console.log(webtoon);
      i += 1;
    }
  }

  async crawlingEndWebtoons() {
    const response = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished`);
    const totalPageNumber = response.data.pageInfo.totalPages;
    let webtoons = [];
    const pageList = Array.from({ length: totalPageNumber }, (_, index) => index + 1);
    for await (const page of pageList) {
      const res = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished?page=${page}`);
      const pageWebtoons = res.data.titleList
        .filter((webtoon) => !webtoon.adult)
        .map((webtoon) => ({
          titleId: String(webtoon.titleId),
          titleName: webtoon.titleName,
          thumbnail: webtoon.thumbnailUrl,
          starScore: webtoon.starScore,
          viewCount: webtoon.viewCount,
          platform: 'naver',
          isEnd: true,
          link: `https://comic.naver.com/webtoon/list?titleId=${webtoon.titleId}`,
        }));
      webtoons = webtoons.concat(pageWebtoons);
    }

    let i = 1;
    for await (const webtoon of webtoons) {
      const check = await this.webtoonRepository.findOne({
        select: ['id', 'isEnd'],
        where: { titleId: webtoon.titleId, platform: 'naver' },
      });
      if (check?.id && check.isEnd) {
        continue;
      } else if (check?.id && !check.isEnd) {
        // 연재 중인 웹툰이 끝난 경우
        await this.webtoonRepository.save({ id: check.id, ...webtoon });
      } else {
        // DB에 없는 새로운 웹툰
        const savedWebtoon = await this.webtoonRepository.save(webtoon);
        await this.cralwingWebtoonDetail(savedWebtoon.id);
      }
      console.log(`Naver 완결 웹툰 ${i}개 크롤링 완료`);
      console.log(webtoon);
      i += 1;
    }
  }

  async cralwingWebtoonDetail(id) {
    const webtoon = await this.webtoonRepository.findOne({ select: ['titleId'], where: { id } });
    const response = await axios.get(`
      https://comic.naver.com/api/article/list/info?titleId=${webtoon.titleId}`);
    const data: {
      publishDayOfWeekList: string[];
      curationTagList: { tagName: string }[];
      synopsis: string;
      favoriteCount: number;
      author: { writers: { name: string }; painters: { name: string }; originAuthors: { name: string } };
    } = response.data;
    const description = data.synopsis.replaceAll(/['"]/g, ' ');
    const interestCount = data.favoriteCount;
    const dayOfWeeks = data.publishDayOfWeekList.map((day) => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase());
    const tags = data.curationTagList.map((tag) => tag.tagName);
    // 글 작가과 그림 작가가 같은 경우 author에 같은 사람이 2번 들어가는 경우, 중복제거가 필요
    const authors: string[] = Object.values(data.author)
      .flatMap((element) => element)
      .map((element) => element.name)
      .filter((element, index, array) => array.indexOf(element) === index);

    await this.webtoonRepository.save({ id, description, interestCount });
    await this.dayOfWeekRepository.save(dayOfWeeks.map((element) => ({ webtoonId: id, day: element })));
    await this.authorRepository.save(authors.map((element) => ({ webtoonId: id, name: element })));
    await this.genreRepository.save(tags.map((element) => ({ webtoonId: id, tag: element })));
  }
}
