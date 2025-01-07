import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Author, DayOfWeek, Genre, Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { convertToNumber, autoScroll } from 'src/common/utils/crawling';

@Injectable()
export class ToptoonCrawlerService {
  private days;
  private dayConverter;
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(DayOfWeek) private dayOfWeekRepository: Repository<DayOfWeek>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    this.days = ['월', '화', '수', '목', '금', '토', '일'];
    this.dayConverter = {
      월: 'Monday',
      화: 'Tuesday',
      수: 'Wednesday',
      목: 'Thursday',
      금: 'Friday',
      토: 'Saturday',
      일: 'Sunday',
    };
  }

  async crawlingWebtoons() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    // const currentWebtoons = await this.crawlingCurrentWebtoons();
    const endWebtoons = await this.crawlingEndWebtoons();
    const webtoons = [...endWebtoons];
    let i = 1;
    for await (let webtoon of webtoons) {
      try {
        const check = await this.webtoonRepository.findOne({
          select: ['id', 'isEnd'],
          where: { titleId: webtoon.titleId, platform: 'toptoon' },
        });
        if (check?.id && check.isEnd === webtoon.isEnd) {
          // 이미 저장되어 있고 연재여부도 그대로
          continue;
        } else if (check?.id) {
          // 저장되어 있는데 연재여부가 바뀐 경우
          this.webtoonRepository.save({ id: check.id, ...webtoon });
        } else {
          // DB에 없는 새로운 웹툰
          const detail = await this.crawlingWebtoonDetail(webtoon.titleId, page);
          webtoon = { ...webtoon, ...detail };
          console.log(`Lezhin 웹툰 ${i}개 크롤링 완료`);
          console.log(webtoon);
          this.webtoonRepository.save(webtoon);
          i += 1;
        }
      } catch (error) {
        console.log(error);
      }
    }
    await browser.close();
  }

  async crawlingCurrentWebtoons() {
    const webtoons = [];
    const days = [1, 2, 3, 4, 5, 6, 7];
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    for await (const day of days) {
      await page.goto(`https://toptoon.com/weekly#weekly${day}`);
      await page.waitForSelector('li.jsComicObj');
      await autoScroll(page);
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
        const viewCount = convertToNumber($(element).find('span.viewCountTxt').text());
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
      await autoScroll(page);
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
          const viewCount = convertToNumber($(element).find('span.viewCountTxt').text());
          const link = `https://toptoon.com/comic/ep_list/${titleId}`;
          webtoons.push({ thumbnail, titleId, titleName, viewCount, link, isEnd: true, platform: 'toptoon' });
        }
      });
      console.log(`${year}년도 완결 웹툰 크롤링 완료`);
    }
    await browser.close();
    return webtoons;
  }

  async crawlingWebtoonDetail(webtoonId: string, page) {
    await page.goto(`https://toptoon.com/comic/ep_list/${webtoonId}`);
    const content = await page.content();
    const $ = load(content);
    const authors = $('span.comic_wt').text().split('&');
    const genres = [];
    const description = $('p.story_synop').text();
    const dayOfWeeks = [];
    $('.comic_tag span').each((index, element) => {
      const tag = $(element).text().slice(1);

      if (this.days.includes(tag)) {
        dayOfWeeks.push(this.dayConverter[tag]);
      } else if (!genres.map((element) => element.tag).includes(tag)) {
        genres.push({ tag });
      }
    });
    const starScore = parseFloat($('.comic_spoint').text());
    return { authors, description, genres, dayOfWeeks, starScore };
  }
}
