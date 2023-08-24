import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoCrawlerService {
  async crawlingWebtoons() {
    const webtoons = [];
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://webtoon.kakao.com/original-webtoon?tab=mon`);
    const content = await page.content();
    const $ = load(content);
    webtoons.push($('.relative.w-full.h-full.overflow-hidden > a.cursor-pointer').attr('href'));
    $('.flex-grow-0.overflow-hidden.flex-[calc((100%-12px)/4)]').each((index, element) => {
      webtoons.push($(element).find('a.w-full.h-full.relative.overflow-hidden').attr('href'));
    });
    return webtoons;
  }
}
