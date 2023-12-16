import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { naverCurrentWebtoonsURL } from 'src/common/constants';
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
    const currentWebtoobs = await this.crawlingCurrentWebtoons();
    const endWebtoons = await this.crawlingEndWebtoons();
    const webtoons = [...currentWebtoobs, ...endWebtoons];
    let i = 1;
    for await (let webtoon of webtoons) {
      const check = await this.webtoonRepository.findOne({
        select: ['id', 'isEnd'],
        where: { titleId: webtoon.titleId, platform: 'naver' },
      });
      if (check?.id && check.isEnd === webtoon.isEnd) {
        // 이미 저장되어 있고 연재여부도 그대로
        continue;
      } else if (check?.id) {
        // 저장되어 있는데 연재여부가 바뀐 경우
        this.webtoonRepository.save({ id: check.id, ...webtoon });
      } else {
        try {
          // DB에 없는 새로운 웹툰
          const detail = await this.crawlingWebtoonDetail(webtoon.titleId);
          webtoon = { ...webtoon, ...detail };
          console.log(`Naver 웹툰 ${i}개 크롤링 완료`);
          console.log(webtoon);
          await this.webtoonRepository.save(webtoon);
          i += 1;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async crawlingCurrentWebtoons() {
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
    console.log(`현재 연재중인 웹툰 크롤링 완료`);
    return webtoons;
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
    console.log(`연재 완료 웹툰 크롤링 완료`);
    return webtoons;
  }

  async crawlingWebtoonDetail(titleId: string) {
    const response = await axios.get(`
      https://comic.naver.com/api/article/list/info?titleId=${titleId}`);
    const data = response.data;
    const description = data.synopsis.replaceAll(/['"]/g, ' ');
    const interestCount = data.favoriteCount;
    const dayOfWeeks = data.publishDayOfWeekList.map((day) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
    }));
    const genres = data.curationTagList.map((tag) => ({ tag: tag.tagName }));
    // 글 작가과 그림 작가가 같은 경우 author에 같은 사람이 2번 들어가는 경우, 중복제거가 필요
    const authors: string[] = data.communityArtists.map((element) => ({ name: element.name }));
    return { description, interestCount, dayOfWeeks, authors, genres };
  }
}
