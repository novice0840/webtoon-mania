import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Webtoon, Author, DayOfWeek, Genre } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LezhinCrawlerService {
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(DayOfWeek) private dayOfWeekRepository: Repository<DayOfWeek>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async crawlingWebtoons() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const currentWetboons = await this.crawlingCurrentWebtoons();
    const endWebtoons = await this.crawlingEndWebtoons();
    const webtoons = [...currentWetboons, ...endWebtoons];
    let i = 1;
    for await (const webtoon of webtoons) {
      try {
        const check = await this.webtoonRepository.findOne({
          select: ['id', 'isEnd'],
          where: { titleId: webtoon.titleId, platform: 'lezhin' },
        });
        if (check?.id && check.isEnd === webtoon.isEnd) {
          // 이미 저장되어 있고 연재여부도 그대로
          continue;
        } else if (check?.id && check.isEnd !== webtoon.isEnd) {
          // 저장되어 있는 웹툰이 연재 여부가 바뀐 경우
          await this.webtoonRepository.save({ id: check.id, isEnd: !webtoon.isEnd });
          if (webtoon.isEnd) {
            await this.dayOfWeekRepository.delete({ webtoonId: check.id });
          } else {
            await this.dayOfWeekRepository.save(
              webtoon.dayOfWeeks.map((element) => ({ day: element, webtoonId: check.id })),
            );
          }
        } else {
          // DB에 없는 새로운 웹툰
          const savedWebtoon = await this.webtoonRepository.save({
            titleId: webtoon.titleId,
            titleName: webtoon.titleName,
            isEnd: webtoon.isEnd,
            platform: webtoon.platform,
            link: webtoon.link,
          });
          await this.dayOfWeekRepository.save(
            webtoon.dayOfWeeks.map((element) => ({ day: element, webtoonId: savedWebtoon.id })),
          );
          await this.authorRepository.save(
            webtoon.authors.map((element) => ({ name: element, webtoonId: savedWebtoon.id })),
          );
          await this.crawlingWebtoonDetail(savedWebtoon.id, page);
        }
        console.log(`Lezhin 웹툰 ${i}개 크롤링 완료`);
        console.log(webtoon);
        i += 1;
      } catch (error) {
        console.log(error);
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
        dayOfWeeks: webtoon.schedule.periods.map((day) => dayConverter[day]),
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
          dayOfWeeks: [],
          link: `https://www.lezhin.com/ko/comic/${webtoon.alias}`,
        });
      });
      console.log(`완결 웹툰 ${rank_year}년도 크롤링 완료`);
    }
    return webtoons;
  }

  async crawlingWebtoonDetail(id, page) {
    const webtoon = await this.webtoonRepository.findOne({ select: ['titleId'], where: { id } });
    await page.goto(`https://www.lezhin.com/ko/comic/${webtoon.titleId}`);
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
    await this.webtoonRepository.save({ id, description, thumbnail });
    await this.genreRepository.save(tags.map((element) => ({ tag: element, webtoonId: id })));
  }
}
