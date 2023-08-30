import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToptoonCrawlerService {
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
  async crawlingWebtoons() {
    const webtoons = [];
    const days = [1]; // [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for await (const day of days) {
      await page.goto(`https://toptoon.com/weekly#weekly${day}`);
      await page.waitForSelector('li.jsComicObj');
      await this.autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      $('ul.swiper-slide.main-swiper.initialized.swiper-main-active li.jsComicObj').each((index, element) => {
        const thumbnail = $(element)
          .find('.thumbbox')
          .attr('style')
          ?.split('url')[1]
          .replace(/^"|"$/g, '')
          .slice(1, -2);
        const titleId = $(element).find('a').attr('href')?.split('/')[3];
        const titleName = $(element).find('span.thumb_tit_text').text();
        const viewCount = $(element).find('span.viewCountTxt').text();
        const link = `https://toptoon.com/comic/ep_list/${titleId}`;
        webtoons.push({ thumbnail, titleId, titleName, viewCount, link });
      });
    }

    return webtoons;
  }

  async crawlingCurrentWebtoons() {
    const webtoons = [];
    const days = [1]; // [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for await (const day of days) {
      await page.goto(`https://toptoon.com/weekly#weekly${day}`);
      await page.waitForSelector('li.jsComicObj');
      await this.autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      $('ul.swiper-slide.main-swiper.initialized.swiper-main-active li.jsComicObj').each((index, element) => {
        const thumbnail = $(element)
          .find('.thumbbox')
          .attr('style')
          ?.split('url')[1]
          .replace(/^"|"$/g, '')
          .slice(1, -2);
        const titleId = $(element).find('a').attr('href')?.split('/')[3];
        const titleName = $(element).find('span.thumb_tit_text').text();
        const viewCount = $(element).find('span.viewCountTxt').text();
        const link = `https://toptoon.com/comic/ep_list/${titleId}`;
        webtoons.push({ thumbnail, titleId, titleName, viewCount, link });
      });
    }

    return webtoons;
  }

  async crawlingEndWebtoons() {
    const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
    const webtoons = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://toptoon.com/complete#complete3`);
    for await (const year of years) {
      await page.waitForSelector('p.jsSelectYearText');
      // await this.autoScroll(page);
      await page.click('.select_box.clearfix');
      await page.click(`li[data-url="/complete/getYearHtml/${year}"]`);
      const content = await page.content();
      const $ = load(content);
    }

    return webtoons;
  }
}
