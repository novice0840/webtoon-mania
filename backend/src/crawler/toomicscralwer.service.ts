import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ToomicsCrawlerService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  private async autoScroll(page): Promise<void> {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 10);
      });
    });
  }

  async crawlingWebtoons(): Promise<void> {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const endWebtoons = await this.crawlingEndWebtoons(page);
    const currentWebtoons = await this.crawlingCurrentWebtoons(page);
    const webtoons = [...endWebtoons, ...currentWebtoons];
    let i = 1;
    for await (const webtoon of webtoons) {
      const IsExist = await this.webtoonRepository.find({ where: { titleId: webtoon.titleId, platform: 'toomics' } });
      if (IsExist.length === 0) {
        try {
          const details = await this.crawlingWebtoonDetail(page, webtoon.titleId);
          console.log(`웹툰 ${i}개 크롤링 완료`);
          console.log({ ...webtoon, ...details });
          this.webtoonRepository.save({ ...webtoon, ...details });
          i += 1;
        } catch (error) {
          console.log(error);
        }
      }
    }
    await browser.close();
  }

  async crawlingCurrentWebtoons(page) {
    const webtoons = [];
    const days = [1, 2, 3, 4, 5, 6, 7];
    const dayConverter = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday',
    };
    for await (const day of days) {
      await page.goto(`https://www.toomics.com/webtoon/weekly/dow/${day}`);
      await page.waitForSelector('li.grid__li img');
      await this.autoScroll(page);
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
          day_of_weeks: dayConverter[day],
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
    await this.autoScroll(page);
    const content = await page.content();
    const $ = load(content);
    $('li.grid__li').each((index, element) => {
      const thumbnail = $(element).find('img').attr('src');
      const titleId = $(element).find('a').attr('href')?.split('/')[6];
      const titleName = $(element).find('strong.toon-dcard__title').text();
      const link = `https://www.toomics.com/webtoon/episode/toon/${titleId}`;
      webtoons.push({ thumbnail, titleId, titleName, link, isEnd: true, platform: 'toomics', day_of_weeks: [] });
    });
    console.log(`완결 웹툰 크롤링 완료`);
    return webtoons;
  }

  async crawlingWebtoonDetail(page, titleId: string) {
    await page.goto(`https://www.toomics.com/webtoon/episode/toon/${titleId}`);
    const content = await page.content();
    const $ = load(content);
    const description = $('.episode__summary').text();
    const tags = [];
    const day_of_weeks = [];
    const authors = $('dl.episode__author dd').text().split(/,|\//);
    // 연재 요일이 tag에 포함되어 있음
    $('a.tag').each((index, element) => {
      const tag = $(element).text().slice(1);
      if (tag.includes('/')) {
        tags.push(...tag.split('/'));
      } else if (tag.includes('월')) {
        day_of_weeks.push('Monday');
      } else if (tag.includes('화')) {
        day_of_weeks.push('Tuesday');
      } else if (tag.includes('수')) {
        day_of_weeks.push('Wednesday');
      } else if (tag.includes('목')) {
        day_of_weeks.push('Thurday');
      } else if (tag.includes('금')) {
        day_of_weeks.push('Friday');
      } else if (tag.includes('토')) {
        day_of_weeks.push('Saturday');
      } else if (tag.includes('일')) {
        day_of_weeks.push('Sunday');
      } else {
        tags.push(tag);
      }
    });
    return { description, tags, authors, day_of_weeks };
  }
}
