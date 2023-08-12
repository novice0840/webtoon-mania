import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Webtoon } from 'src/entity/webtoon.entity';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
  ) {}

  // 메인페이지에서 모든 웹툰을 크롤링하는 함수
  async crawlingWebtoon(day) {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    const webtoons = [];
    const response = await axios.get(
      'https://comic.naver.com/api/webtoon/titlelist/weekday',
    );
    response.data.titleListMap[day]
      .filter((newWebtoon) => !newWebtoon.adult)
      .forEach((newWebtoon) => {
        if (webtoons.some((webtoon) => webtoon.id === newWebtoon.titleId)) {
          webtoons.forEach((webtoon) => {
            if (webtoon.id === newWebtoon.titleId) {
              webtoon.dayOfWeek.push(day);
            }
          });
        } else {
          webtoons.push({
            id: newWebtoon.titleId ?? 0,
            title: newWebtoon.titleName ?? '',
            author: newWebtoon.author ?? '',
            thumbnail: newWebtoon.thumbnailUrl ?? '',
            dayOfWeek: [day],
            starScore: newWebtoon.starScore ?? 0,
            tags: [],
            description: '',
            interestCount: 0,
          });
        }
      });

    let i = 1;
    for await (const webtoon of webtoons) {
      try {
        await page.goto(
          `https://comic.naver.com/webtoon/list?titleId=${webtoon.id}`,
        );
        await page.waitForSelector('p.EpisodeListInfo__summary--Jd1WG');
        const content = await page.content();
        const $ = load(content);
        const tags: string[] = [];
        $('a.TagGroup__tag--xu0OH')?.each((i, element) => {
          tags.push($(element).text());
        });
        webtoon.tags = tags;
        webtoon.description =
          $('p.EpisodeListInfo__summary--Jd1WG')
            ?.text()
            .replaceAll("'", ' ')
            .replaceAll('"', ' ') ?? '';
        webtoon.interestCount =
          parseInt(
            $('span.EpisodeListUser__count--fNEWK')?.text().replaceAll(',', ''),
          ) ?? 0;
        console.log(`웹툰 크롤링 ${i}개 완료 - ${webtoon.title}`);
        i = i + 1;
      } catch (error) {
        console.log(error);
      }
    }

    await browser.close();
    return webtoons;
  }

  // 모든 page를 돌며 모든 chapter를 크롤링하는 함수
  async crawlingChapter(webtoons) {
    const chapters = [];

    for await (const webtoon of webtoons) {
      const response =
        await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoon.id}&page=1
      `);
      const { totalPages: pageNumber } = response.data.pageInfo;
      const pageList = Array.from(
        { length: pageNumber },
        (_, index) => index + 1,
      );
      for await (const page of pageList) {
        const res = await axios.get(
          `https://comic.naver.com/api/article/list?titleId=${webtoon.id}&page=${page}`,
        );
        res.data.articleList.forEach((article) => {
          chapters.push({
            id: article.no ?? 0,
            webtoonId: webtoon.id ?? 0,
            name:
              article.subtitle.replaceAll("'", ' ').replaceAll('"', ' ') ?? '',
            uploadDate: article.serviceDateDescription ?? '2000-01-01',
            thumbnail: article.thumbnailUrl ?? '',
          });
        });
      }
    }
    let i = 1;
    for await (const chapter of chapters) {
      const response = await axios.get(
        `https://comic.naver.com/api/userAction/info?titleId=${chapter.webtoonId}&no=${chapter.id}`,
      );
      const { starScore, averageStarScore } = response?.data?.starInfo;
      chapter.totalStar = starScore ?? 0;
      chapter.averageStar = averageStarScore ?? 0;
      console.log(`${i}번째 Chapter 크롤링 완료`);
      i += 1;
    }

    return chapters;
  }

  // 가장 최근 페이지만 크롤링
  async crawlingRecentChapter(webtoons) {
    const chapters = [];
    for await (const webtoon of webtoons) {
      const res = await axios.get(
        `https://comic.naver.com/api/article/list?titleId=${webtoon.id}`,
      );
      res.data.articleList.forEach((article) => {
        chapters.push({
          id: article.no ?? 0,
          webtoonId: webtoon.id ?? 0,
          name:
            article.subtitle.replaceAll("'", ' ').replaceAll('"', ' ') ?? '',
          uploadDate: article.serviceDateDescription ?? '2000-01-01',
          thumbnail: article.thumbnailUrl ?? '',
        });
      });
    }
    let i = 1;
    for await (const chapter of chapters) {
      const response = await axios.get(
        `https://comic.naver.com/api/userAction/info?titleId=${chapter.webtoonId}&no=${chapter.id}`,
      );
      const { starScore, averageStarScore } = response?.data?.starInfo;
      chapter.totalStar = starScore ?? 0;
      chapter.averageStar = averageStarScore ?? 0;
      console.log(`${i}번째 Chapter 크롤링 완료`);
      i += 1;
    }
    return chapters;
  }
}
