import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToomicsCrawlerService {
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

  async crawlingCurrentWebtoons() {
    const webtoons = [];
    const days = [1]; // [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for await (const day of days) {
      await page.goto(`https://www.toomics.com/webtoon/weekly/dow/${day}`);
      await page.waitForSelector('li.grid__li');
      await this.autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      $('li.grid__li').each((index, element) => {
        const thumbnail = $(element).find('img').attr('src');
        const titleId = $(element).find('a').attr('href')?.split('/')[6];
        const titleName = $(element).find('span.toon-dcard__link').text();
        const link = `https://www.toomics.com/webtoon/episode/toon/${titleId}`;
        webtoons.push({ thumbnail, titleId, titleName, link, isEnd: false, platform: 'toomics' });
      });
      console.log(`${day} 연재 웹툰 크롤링 완료`);
    }
    await browser.close();
    return webtoons;
  }

  async crawlingEndWebtoons() {
    const webtoons = [];
    const days = [1]; // [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for await (const day of days) {
      await page.goto(`https://www.toomics.com/webtoon/weekly/dow/${day}`);
      await page.waitForSelector('li.grid__li');
      await this.autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      $('li.grid__li').each((index, element) => {
        const thumbnail = $(element).find('img').attr('src');
        const titleId = $(element).find('a').attr('href')?.split('/')[6];
        const titleName = $(element).find('span.toon-dcard__link').text();
        const link = `https://www.toomics.com/webtoon/episode/toon/${titleId}`;
        webtoons.push({ thumbnail, titleId, titleName, link, isEnd: false, platform: 'toomics' });
      });
      console.log(`${day} 연재 웹툰 크롤링 완료`);
    }
    await browser.close();
    return webtoons;
  }
}
