import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { Injectable } from '@nestjs/common';
import { Author, DayOfWeek, Genre, Webtoon } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { autoScroll, sleep, convertToNumber } from 'src/common/utils/crawling';

@Injectable()
export class KakaoCrawlerService {
  private days;
  private dayConverter;
  constructor(
    @InjectRepository(Webtoon) private webtoonRepository: Repository<Webtoon>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(DayOfWeek) private dayOfWeekRepository: Repository<DayOfWeek>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {
    this.days = ['mon']; //['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'complete'];
    this.dayConverter = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    };
  }

  async crawlingWebtoons() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let webtoons = [];
    for await (const day of this.days) {
      const dayWebtoons = await this.crawlingDayWebtoon(day, page);
      webtoons = webtoons.concat(dayWebtoons);
    }
    let i = 1;
    for await (let webtoon of webtoons) {
      try {
        const check = await this.webtoonRepository.findOne({
          select: ['id', 'isEnd'],
          where: { titleId: webtoon.titleId, platform: 'kakao' },
        });
        if (check?.id && check.isEnd === webtoon.isEnd) {
          // 이미 저장되어 있고 연재여부도 그대로
          continue;
        } else if (check?.id) {
          // 저장되어 있는데 연재여부가 바뀐 경우
          await this.webtoonRepository.save({ id: check.id, ...webtoon });
        } else {
          // DB에 없는 새로운 웹툰
          const detail = await this.crawlingWebtoonDetail(webtoon.titleId, webtoon.titleName, page);
          webtoon = { ...webtoon, ...detail };
          console.log(`Kakao 웹툰 ${i}개 크롤링 완료`);
          console.log(webtoon);
          await this.webtoonRepository.save(webtoon);
          i += 1;
          // await sleep(5000);
        }
      } catch (error) {
        console.log('error check');
      }
    }
    await browser.close();
  }

  async crawlingDayWebtoon(day, page) {
    const webtoons = [];
    await page.goto(`https://webtoon.kakao.com/original-webtoon?tab=${day}`);
    await autoScroll(page);
    const content = await page.content();
    const $ = load(content);
    $('.relative.w-full').each((index, element) => {
      const $webtoon = $(element).find('a').attr('href');
      const $adult = $(element).find('.w-full.mt-6.px-2.flex-center.gap-x-2 > img').attr('alt');
      // Webtoon이 아닌 태그와 성인 웹툰 제거
      if ($webtoon && $webtoon !== '#none' && $adult !== '성인') {
        const thumbnail = $(element).find('img.w-full').attr('src');
        const [a, b, titleName, titleId] = $webtoon.split('/');
        webtoons.push({
          titleId,
          titleName,
          thumbnail,
          platform: 'kakao',
          isEnd: day === 'complete',
          dayOfWeeks: [{ day: this.dayConverter[day] }],
          link: `https://webtoon.kakao.com/content/${titleName}/${titleId}`,
        });
      }
    });
    return webtoons;
  }

  async crawlingWebtoonDetail(titleId, titleName, page) {
    await page.goto(`https://webtoon.kakao.com/content/${titleName}/${titleId}`);
    await page.waitForSelector(
      'p.whitespace-pre-wrap.break-all.break-words.support-break-word.overflow-hidden.text-ellipsis',
    );
    const content = await page.content();
    const $ = load(content);
    const authors = $('p.whitespace-pre-wrap.break-all.break-words.support-break-word.overflow-hidden.text-ellipsis')
      .eq(1)
      .text()
      .split(', ')
      .map((element) => ({ name: element }));
    const info = $('.flex.justify-center.items-start.h-14.mt-8.leading-14');
    const tags = info
      .find('p')
      .eq(0)
      .text()
      .split(/\s|\//)
      .map((element) => ({ tag: element }));
    const likeCount = convertToNumber(info.find('p').eq(1).text());
    const viewCount = convertToNumber(info.find('p').eq(2).text());
    return { authors, tags, likeCount, viewCount };
  }
}
