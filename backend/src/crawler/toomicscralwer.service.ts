import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { autoScroll } from 'src/util/crawling';

@Injectable()
export class ToomicsCrawlerService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  async crawlingWebtoons(): Promise<void> {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const endWebtoons = await this.crawlingEndWebtoons(page);
    const currentWebtoons = await this.crawlingCurrentWebtoons(page);
    const webtoons = [...endWebtoons, ...currentWebtoons];
    // const webtoons = [{ titleId: '5278', isEnd: true }];
    let i = 1;
    for await (let webtoon of webtoons) {
      try {
        const check = await this.webtoonRepository.findOne({
          select: ['id', 'isEnd'],
          where: { titleId: webtoon.titleId, platform: 'toomics' },
        });
        if (check?.id && check.isEnd === webtoon.isEnd) {
          // 이미 저장되어 있고 연재여부도 그대로
          continue;
        } else if (check?.id) {
          // 저장되어 있는데 연재여부가 바뀐 경우
          await this.webtoonRepository.save({ id: check.id, ...webtoon });
        } else {
          // DB에 없는 새로운 웹툰
          const detail = await this.crawlingWebtoonDetail(webtoon.titleId, page);
          webtoon = { ...webtoon, ...detail };
          console.log(`Toomics 웹툰 ${i}개 크롤링 완료`);
          console.log(webtoon);
          await this.webtoonRepository.save(webtoon);
          i += 1;
        }
      } catch (error) {
        console.log(error);
      }
    }
    await browser.close();
  }

  async crawlingCurrentWebtoons(page) {
    const webtoons = [];
    const days = [1, 2, 3, 4, 5, 6, 7];
    for await (const day of days) {
      await page.goto(`https://www.toomics.com/webtoon/weekly/dow/${day}`);
      await page.waitForSelector('li.grid__li img');
      await autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      $('li.grid__li').each((index, element) => {
        const thumbnail = $(element).find('img').attr('src');
        const titleId = $(element).find('a').attr('href')?.split('/')[6];
        const titleName = $(element).find('span.toon-dcard__link').text();
        const link = `https://www.toomics.com/webtoon/episode/toon/${titleId}`;
        webtoons.push({
          thumbnail,
          titleId,
          titleName,
          link,
          isEnd: false,
          platform: 'toomics',
        });
      });
      console.log(`${day} 연재 웹툰 크롤링 완료`);
    }
    return webtoons;
  }

  async crawlingEndWebtoons(page) {
    const webtoons = [];
    await page.goto(`https://www.toomics.com/webtoon/finish/ord/famous`);
    await page.waitForSelector('li.grid__li img');
    await autoScroll(page);
    const content = await page.content();
    const $ = load(content);
    $('li.grid__li').each((index, element) => {
      const thumbnail = $(element).find('img').attr('src');
      const titleId = $(element).find('a').attr('href')?.split('/')[6];
      const titleName = $(element).find('strong.toon-dcard__title').text();
      const link = `https://www.toomics.com/webtoon/episode/toon/${titleId}`;
      webtoons.push({ thumbnail, titleId, titleName, link, isEnd: true, platform: 'toomics' });
    });
    console.log(`완결 웹툰 크롤링 완료`);
    return webtoons;
  }

  async crawlingWebtoonDetail(titleId: string, page) {
    await page.goto(`https://www.toomics.com/webtoon/episode/toon/${titleId}`);
    const content = await page.content();
    const $ = load(content);
    const description = $('.episode__summary').text();
    const genres = [];
    const dayOfWeeks = [];
    const authors = $('dl.episode__author dd')
      .text()
      .split(/,|\//)
      .map((element) => ({ name: element }));
    // 연재 요일이 tag에 포함되어 있음
    const dayConverter = {
      월요연재: 'Monday',
      화요연재: 'Thuesday',
      수요연재: 'Wednesday',
      목요연재: 'Thursday',
      금요연재: 'Friday',
      토요연재: 'Saturday',
      일요연재: 'Sunday',
    };
    $('a.tag.tag--blue').each((index, element) => {
      const text = $(element).text().slice(1);
      if (dayConverter[text]) {
        dayOfWeeks.push({ day: dayConverter[text] });
      }
    });
    $('a.tag.tag--gray').each((index, element) => {
      genres.push({ tag: $(element).text().slice(1) });
    });
    return { description, genres, authors, dayOfWeeks };
  }
}
