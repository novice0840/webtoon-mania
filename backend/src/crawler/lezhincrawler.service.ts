import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LezhinCrawlerService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  async crawlingWebtoons() {
    const currentWetboons = await this.crawlingCurrentWebtoons();
    const endWebtoons = await this.crawlingEndWebtoons();
    const webtoons = [...currentWetboons, ...endWebtoons];
    let i = 1;
    for await (const webtoon of webtoons) {
      const IsExist = await this.webtoonRepository.find({ where: { titleId: webtoon.titleId, platform: 'lezhin' } });
      if (IsExist.length === 0) {
        try {
          const details = await this.crawlingWebtoonDetail(webtoon.titleId);
          console.log(`웹툰 ${i}개 크롤링 완료`);
          console.log({ ...webtoon, ...details });
          this.webtoonRepository.save({ ...webtoon, ...details });
          i += 1;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  async crawlingCurrentWebtoons() {
    const params = {
      platform: 'web',
      store: 'web',
    };
    const headers = {
      'X-Lz-Locale': 'ko-KR',
    };
    const response = await axios.get(`https://www.lezhin.com/lz-api/v2/inventory_groups/home_scheduled_k`, {
      params,
      headers,
    });
    const dayConverter = {
      MON: 'Monday',
      TUE: 'Tuesday',
      WED: 'Wednesday',
      THU: 'Thursday',
      FRI: 'Friday',
      SAT: 'Saturday',
      SUN: 'Sunday',
    };
    console.log(`현재 연재중인 웹툰 크롤링 완료`);
    return response.data.data.inventoryList
      .slice(1)
      .flatMap((element) => element.items)
      .map((webtoon) => ({
        titleId: webtoon.alias,
        titleName: webtoon.title,
        day_of_weeks: webtoon.schedule.periods.map((day) => dayConverter[day]),
        authors: webtoon.authors.map((author) => author.name),
        platform: 'lezhin',
        isEnd: false,
        link: `https://www.lezhin.com/ko/comic/${webtoon.alias}`,
      }));
  }

  async crawlingEndWebtoons() {
    const rank_years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const webtoons = [];
    for await (const rank_year of rank_years) {
      const params = {
        offset: 0,
        country_code: 'kr',
        filter: 'all',
        store: 'web',
        adult_kind: 'kid',
        rank_type: 'annual',
        limit: 1000,
        genres: '_all',
        rank_year,
      };
      const headers = {
        'X-Lz-Locale': 'ko-KR',
      };
      const response = await axios.get(`https://www.lezhin.com/lz-api/v2/comics`, { params, headers });
      response.data.data.forEach((webtoon) => {
        webtoons.push({
          titleId: webtoon.alias,
          titleName: webtoon.title,
          authors: webtoon.artists.map((artist) => artist.name),
          isEnd: true,
          platform: 'lezhin',
          day_of_weeks: [],
          link: `https://www.lezhin.com/ko/comic/${webtoon.alias}`,
        });
      });
      console.log(`완결 웹툰 ${rank_year}년도 크롤링 완료`);
    }
    return webtoons;
  }

  async crawlingWebtoonDetail(titleId: string) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://www.lezhin.com/ko/comic/${titleId}`);
    await page.click('button.comicInfo__btnShowExtend');
    await page.waitForSelector('.comicInfoExtend__synopsis');
    const content = await page.content();
    const $ = load(content);
    const description = $('.comicInfoExtend__synopsis p').text();
    const thumbnail = $('picture.comicInfo__cover img').attr('src');
    const tags = [];
    $('a.comicInfo__tag').each((index, element) => {
      tags.push($(element).text().slice(1));
    });
    await browser.close();
    return { titleId, description, tags, thumbnail };
  }
}
