import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ToptoonCrawlerService {
  constructor(@InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>) {}

  private convertToNumber(str): number {
    const tenThousand = 10000; // 1만의 값
    const tenMillion = 100000000;
    const thousand = 1000;
    let number;
    if (str.endsWith('만')) {
      number = parseFloat(str) * tenThousand; // 문자열에서 숫자 부분 추출
    } else if (str.endsWith('억')) {
      number = parseFloat(str) * tenMillion; // 문자열에서 숫자 부분 추출
    } else if (str.endsWith('천')) {
      number = parseFloat(str) * thousand; // 문자열에서 숫자 부분 추출
    } else {
      number = parseFloat(str); // 문자열에서 숫자 부분 추출
    }
    return !isNaN(number) ? number : 0;
  }
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
    const endWebtoons = await this.crawlingEndWebtoons();
    const currentWebtoons = await this.crawlingCurrentWebtoons();
    const webtoons = [...endWebtoons, ...currentWebtoons];
    let i = 1;
    for await (const webtoon of webtoons) {
      const IsExist = await this.webtoonRepository.find({ where: { titleId: webtoon.titleId, platform: 'toptoon' } });
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
    const webtoons = [];
    const days = [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: 'new' });
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
          .slice(1, -2)
          .replace(/^"|"$/g, '');
        const titleId = $(element).find('a').attr('href')?.split('/')[3];
        const titleName = $(element).find('span.thumb_tit_text').text();
        const viewCount = this.convertToNumber($(element).find('span.viewCountTxt').text());
        const link = `https://toptoon.com/comic/ep_list/${titleId}`;
        webtoons.push({ thumbnail, titleId, titleName, viewCount, link, isEnd: false, platform: 'toptoon' });
      });
      console.log(`${day} 연재 웹툰 크롤링 완료`);
    }
    await browser.close();
    return webtoons;
  }

  async crawlingEndWebtoons() {
    const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
    const webtoons = [];
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    for await (const year of years) {
      await page.goto(`https://toptoon.com/complete#complete3`);
      await page.waitForSelector('.thumbbox');
      await this.autoScroll(page);
      await page.click('.select_box.clearfix');
      await page.click(`li[data-url="/complete/getYearHtml/${year}"]`);
      await page.waitForSelector('.thumbbox');
      const content = await page.content();
      const $ = load(content);
      $('li.jsComicObj').each((index, element) => {
        const thumbnail = $(element)
          .find('.thumbbox')
          .attr('style')
          ?.split('url')[1]
          .slice(1, -2)
          .replace(/^"|"$/g, '');
        // 탑툰이 특정 탭을 눌러 웹툰을 가져올때 그 다음 탭의 웹툰을 일부분을 미리 불러오기 때문에 해당 부분은 썸네일이 없다.
        if (thumbnail) {
          const titleId = $(element).find('a').attr('href')?.split('/')[3];
          const titleName = $(element).find('span.thumb_tit_text').text();
          const viewCount = this.convertToNumber($(element).find('span.viewCountTxt').text());
          const link = `https://toptoon.com/comic/ep_list/${titleId}`;
          webtoons.push({ thumbnail, titleId, titleName, viewCount, link, isEnd: true, platform: 'toptoon' });
        }
      });
      console.log(`${year}년도 완결 웹툰 크롤링 완료`);
    }
    await browser.close();
    return webtoons;
  }

  async crawlingWebtoonDetail(webtoonId: string) {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const dayConverter = {
      월: 'Monday',
      화: 'Tuesday',
      수: 'Wednesday',
      목: 'Thursday',
      금: 'Friday',
      토: 'Saturday',
      일: 'Sunday',
    };
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://toptoon.com/comic/ep_list/${webtoonId}`);
    const content = await page.content();
    const $ = load(content);
    const authors = $('span.comic_wt').text().split('&');
    const tags = [];
    $('.comic_tag span').each((index, element) => {
      tags.push($(element).text().slice(1));
    });
    const description = $('p.story_synop').text();
    const day_of_weeks = [];
    $('.comic_tag span').each((index, element) => {
      const tag = $(element).text().slice(1);

      if (days.includes(tag)) {
        day_of_weeks.push(dayConverter[tag]);
      } else {
        tags.push(tag);
      }
    });
    const starScore = parseFloat($('.comic_spoint').text());
    await browser.close();
    return { authors, description, tags, day_of_weeks, starScore };
  }
}
