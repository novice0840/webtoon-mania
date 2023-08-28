import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LezhinCrawlerService {
  async crawlingWebtoons() {
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
    return response.data.data.inventoryList
      .slice(1)
      .flatMap((element) => element.items)
      .map((webtoon) => ({
        titleId: webtoon.alias,
        titleName: webtoon.title,
        day_of_weeks: webtoon.schedule.periods,
        authors: webtoon.authors.map((author) => author.name),
        platform: 'lezhin',
        isEnd: false,
      }));
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
    return response.data.data.inventoryList
      .slice(1)
      .flatMap((element) => element.items)
      .map((webtoon) => ({
        titleId: webtoon.alias,
        titleName: webtoon.title,
        day_of_weeks: webtoon.schedule.periods,
        authors: webtoon.authors.map((author) => author.name),
        platform: 'lezhin',
        isEnd: false,
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
        });
      });
    }
    return webtoons;
  }

  async crawlingWebtoonDetail(titleId: string) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.lezhin.com/ko/comic/${titleId}`);
    await page.click('button.comicInfo__btnShowExtend');
    await page.waitForSelector('.comicInfoExtend__synopsis');
    const content = await page.content();
    const $ = load(content);
    const description = $('.comicInfoExtend__synopsis p').text();
    const thumbnail = $('picture.comicInfo_cover img').attr('src');
    const tags = [];
    $('.a.comicInfoExtend__tag').each((index, element) => {
      tags.push($(element).text());
    });
    await browser.close();
    return { titleId, description, tags, thumbnail };
  }
}
