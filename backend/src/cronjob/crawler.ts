import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import axios from 'axios';

type Webtoon = {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  dayOfWeek: string[];
  starScore: number;
  tags: string[];
  description: string;
  interestCount: number;
};

export const crawlingWebtoon = async (day) => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  const webtoons: Webtoon[] = [];
  const response = await axios.get(
    'https://comic.naver.com/api/webtoon/titlelist/weekday',
  );
  response.data.titleListMap[day]
    .filter((newWebtoon) => !newWebtoon.adult)
    .forEach((newWebtoon) => {
      if (webtoons.some((webtoon) => webtoon.id === newWebtoon.titleId)) {
        webtoons.forEach((webtoon) => {
          if (webtoon.id === newWebtoon.titleId) {
            webtoon.dayOfWeek.push(day);
          }
        });
      } else {
        webtoons.push({
          id: newWebtoon.titleId,
          title: newWebtoon.titleName,
          author: newWebtoon.author,
          thumbnail: newWebtoon.thumbnailUrl,
          dayOfWeek: [day],
          starScore: newWebtoon.starScore,
          tags: [],
          description: '',
          interestCount: 0,
        });
      }
    });

  let i = 1;
  for await (const webtoon of webtoons) {
    await page.goto(
      `https://comic.naver.com/webtoon/list?titleId=${webtoon.id}`,
    );
    await page.waitForSelector('p.EpisodeListInfo__summary--Jd1WG');
    const content = await page.content();
    const $ = cheerio.load(content);
    const tags: string[] = [];
    $('a.TagGroup__tag--xu0OH')?.each((i, element) => {
      tags.push($(element).text());
    });
    webtoon.tags = tags;
    webtoon.description =
      $('p.EpisodeListInfo__summary--Jd1WG')
        ?.text()
        .replaceAll("'", ' ')
        .replaceAll('"', ' ') ?? '';
    webtoon.interestCount =
      parseInt(
        $('span.EpisodeListUser__count--fNEWK')?.text().replaceAll(',', ''),
      ) ?? 0;
    console.log(`웹툰 크롤링 ${i}개 완료`);
    i = i + 1;
  }
  await browser.close();
  return webtoons;
};

export const crawlingChapter = async (webtoons) => {
  const chapters = [];

  for await (const webtoon of webtoons) {
    const response =
      await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoon.id}&page=1
    `);
    const { totalPages: pageNumber } = response.data.pageInfo;
    const pageList = Array.from(
      { length: pageNumber },
      (_, index) => index + 1,
    );
    for await (const page of pageList) {
      try {
        const res = await axios.get(
          `https://comic.naver.com/api/article/list?titleId=${webtoon.id}&page=${page}`,
        );
        res.data.articleList.forEach((article) => {
          chapters.push({
            id: article.no,
            webtoonId: webtoon.id,
            name: article.subtitle.replaceAll("'", ' ').replaceAll('"', ' '),
            uploadDate: article.serviceDateDescription,
            thumbnail: article.thumbnailUrl,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  let i = 1;
  for await (const chapter of chapters) {
    try {
      const response = await axios.get(
        `https://comic.naver.com/api/userAction/info?titleId=${chapter.webtoonId}&no=${chapter.id}`,
      );
      const { starScore, averageStarScore } = response?.data?.starInfo;
      chapter.totalStar = starScore;
      chapter.averageStar = averageStarScore;
      console.log(`${i}번째 Chapter 크롤링 완료`);
      i += 1;
    } catch (error) {
      console.log(error);
    }
  }

  return chapters;
};
