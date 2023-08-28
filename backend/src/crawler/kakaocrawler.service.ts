import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { Injectable } from '@nestjs/common';
import { Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KakaoCrawlerService {
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

  private convertToNumber(str): number {
    const tenThousand = 10000; // 1만의 값
    const tenMillion = 100000000;
    let number;
    if (str.endsWith('만')) {
      number = parseFloat(str) * tenThousand; // 문자열에서 숫자 부분 추출
    } else if (str.endsWith('억')) {
      number = parseFloat(str) * tenMillion; // 문자열에서 숫자 부분 추출
    } else {
      number = parseFloat(str); // 문자열에서 숫자 부분 추출
    }
    return !isNaN(number) ? number : 0;
  }

  async crawlingWebtoonDetail(titleName: string, titleId: string) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`https://webtoon.kakao.com/content/${titleName}/${titleId}`);
    await page.waitForSelector(
      'p.whitespace-pre-wrap.break-all.break-words.support-break-word.overflow-hidden.text-ellipsis',
    );
    const content = await page.content();
    const $ = load(content);
    await browser.close();
    const authors = $('p.whitespace-pre-wrap.break-all.break-words.support-break-word.overflow-hidden.text-ellipsis')
      .eq(1)
      .text()
      .split(', ');
    const info = $('.flex.justify-center.items-start.h-14.mt-8.leading-14');
    const tags = info.find('p').eq(0).text().split(/\s|\//);
    const likeCount = this.convertToNumber(info.find('p').eq(1).text());
    const viewCount = this.convertToNumber(info.find('p').eq(2).text());
    return { authors, tags, likeCount, viewCount };
  }

  sleep(ms): void {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  async crawlingWebtoons() {
    let storedWebtoons;
    let storedTitleIds;
    const webtoonBases = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const webtoonKinds = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'complete'];
    const dayConverter = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    };
    for await (const webtoonKind of webtoonKinds) {
      storedWebtoons = await this.webtoonRepository.find({ select: ['titleId'], where: { platform: 'kakao' } });
      storedTitleIds = storedWebtoons.map((webtoon) => webtoon.titleId);
      await page.goto(`https://webtoon.kakao.com/original-webtoon?tab=${webtoonKind}`);
      await this.autoScroll(page);
      const content = await page.content();
      const $ = load(content);
      let crawled = $('.relative.w-full.h-full.overflow-hidden > a.cursor-pointer').attr('href');
      if (crawled != null) {
        const info = crawled.split('/');
        const thumbnail = $('img.absolute.bottom-0').attr('src');
        webtoonBases.push({
          titleName: info[2],
          titleId: info[3],
          thumbnail,
          isEnd: webtoonKind === 'complete' ? true : false,
          dayOfWeeks: webtoonKind !== 'complete' ? [dayConverter[webtoonKind]] : null,
          platform: 'kakao',
          link: `https://webtoon.kakao.com/content/${info[2]}/${info[3]}`,
        });
      }
      $('.flex-grow-0.overflow-hidden').each((index, element) => {
        crawled = $(element).find('a.w-full.h-full.relative.overflow-hidden').attr('href');
        if (crawled != null) {
          const info = crawled.split('/');
          const thumbnail = $(element).find('img.w-full.h-full.object-cover.object-top').attr('src');
          webtoonBases.push({
            titleName: info[2],
            titleId: info[3],
            thumbnail,
            isEnd: webtoonKind === 'complete' ? true : false,
            dayOfWeeks: webtoonKind !== 'complete' ? [dayConverter[webtoonKind]] : null,
            platform: 'kakao',
            link: `https://webtoon.kakao.com/content/${info[2]}/${info[3]}`,
          });
        }
      });
      console.log(`${webtoonKind} 웹툰 크롤링 완료`);
    }
    let i = 1;
    for await (const webtoonBase of webtoonBases) {
      if (!storedTitleIds.includes(webtoonBase.titleId)) {
        const details = await this.crawlingWebtoonDetail(webtoonBase.titleName, webtoonBase.titleId);
        await this.webtoonRepository.save({ ...webtoonBase, ...details });
        this.sleep(5000);
        console.log({ ...webtoonBase, ...details });
        console.log(`Webtoon ${i}개 크롤링 완료`);
        i = i + 1;
      }
    }
    await browser.close();
  }
}
