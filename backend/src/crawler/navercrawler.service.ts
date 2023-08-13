import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Webtoon } from 'src/entity/webtoon.entity';
import {
  naverCurrentWebtoonsURL,
  naverWebtoonURL,
  $naverWebtoonDescription,
  $naverWebtoonTags,
  $naverWebtoonInterest,
  $naverWebtoonDayOfWeek,
} from 'src/constants';

@Injectable()
export class NaverCrawlerService {
  async cralwingWebtoonBase() {
    const response = await axios.get(naverCurrentWebtoonsURL);
    return Object.values(response.data.titleListMap)
      .flatMap((webtoon) => webtoon as any[])
      .filter((webtoon) => !webtoon.adult)
      .map((webtoon) => ({
        code: String(webtoon.titleId),
        title: webtoon.titleName,
        author: webtoon.author.split(' / '),
        thumbnail: webtoon.thumbnailUrl,
        startScore: webtoon.starscore,
      }));
  }

  async cralwingWebtoonDetail(webtoons) {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    let i = 1;
    for await (const webtoon of webtoons) {
      await page.goto(`${naverWebtoonURL}?titleId=${webtoon.code}`);
      await page.waitForSelector($naverWebtoonDescription);
      const content = await page.content();
      const $ = load(content); // #a#b#c
      const dayOfWeek = [];
      const days = $($naverWebtoonDayOfWeek).text();
      if (days.includes('월')) dayOfWeek.push('Monday');
      if (days.includes('화')) dayOfWeek.push('Tuesday');
      if (days.includes('수')) dayOfWeek.push('Wednesday');
      if (days.includes('목')) dayOfWeek.push('Thursday');
      if (days.includes('금')) dayOfWeek.push('Friday');
      if (days.includes('토')) dayOfWeek.push('Saturday');
      if (days.includes('일')) dayOfWeek.push('Sunday');

      webtoon.dayOfWeek = dayOfWeek;
      webtoon.tags = $($naverWebtoonTags)
        .text()
        .split('#')
        .splice(1)
        .map((tag) => `#${tag}`);
      webtoon.description = $($naverWebtoonDescription)?.text().replaceAll(/['"]/g, ' ');
      webtoon.interestCount = parseInt($($naverWebtoonInterest)?.text().replaceAll(',', ''));
      console.log(`웹툰 크롤링 ${i}개 완료 - ${webtoon.title}`);
      i = i + 1;
    }
    await browser.close();
    return webtoons;
  }

  // 모든 page를 돌며 모든 chapter를 크롤링하는 함수
  async crawlingChapter(webtoons) {
    const chapters = [];
    for await (const webtoon of webtoons) {
      const response = await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoon.id}
      `);
      const { totalPages: pageNumber } = response.data.pageInfo;
      const pageList = Array.from({ length: pageNumber }, (_, index) => index + 1);
      for await (const page of pageList) {
        const res = await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoon.id}&page=${page}`);
        res.data.articleList.forEach((article) => {
          chapters.push({
            id: article.no,
            webtoonId: webtoon.id,
            name: article.subtitle.replaceAll(/['"]/g, ' '),
            uploadDate: article.serviceDateDescription,
            thumbnail: article.thumbnailUrl,
          });
        });
      }
    }
    return chapters;
  }

  // 가장 최근 페이지만 크롤링
  async crawlingRecentChapter(webtoons) {
    const chapters = [];
    for await (const webtoon of webtoons) {
      const res = await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoon.id}`);
      res.data.articleList.forEach((article) => {
        chapters.push({
          id: article.no ?? 0,
          webtoonId: webtoon.id ?? 0,
          name: article.subtitle.replaceAll("'", ' ').replaceAll('"', ' ') ?? '',
          uploadDate: article.serviceDateDescription ?? '2000-01-01',
          thumbnail: article.thumbnailUrl ?? '',
        });
      });
    }
    return chapters;
  }
}
