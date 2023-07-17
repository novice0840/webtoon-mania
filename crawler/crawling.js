const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const db_init = require("./database");

const scrollDownToBottom = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
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
};

const crawlingWebtoon = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  let webtoons = [];
  const response = await axios.get("https://comic.naver.com/api/webtoon/titlelist/weekday");
  const allDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  allDays.forEach((day) => {
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
          });
        }
      });
  });
  let i = 1;
  for await (let webtoon of webtoons) {
    await page.goto(`https://comic.naver.com/webtoon/list?titleId=${webtoon.id}`);
    await page.waitForSelector("p.EpisodeListInfo__summary--Jd1WG");
    const content = await page.content();
    const $ = cheerio.load(content);
    let tags = [];
    $("a.TagGroup__tag--xu0OH")?.each((i, element) => {
      tags.push($(element).text());
    });
    webtoon.tags = tags;
    webtoon.description =
      $("p.EpisodeListInfo__summary--Jd1WG")?.text().replaceAll("'", " ").replaceAll('"', " ") ?? "";
    webtoon.interestCount = parseInt($("span.EpisodeListUser__count--fNEWK")?.text().replaceAll(",", "")) ?? 0;
    console.log(`웹툰 크롤링 ${i}개 완료`);
    i = i + 1;
  }
  await browser.close();
  return webtoons;
};

const crawlingChapter = async (dayOfWeek) => {
  const connection = await db_init();
  let chapters = [];
  const [rows, field] = await connection.execute(
    `select id from webtoon_base_info where day_of_week LIKE %${dayOfWeek}%`
  );

  let check = 1;
  for await (const row of rows) {
    let response = await axios.get(`https://comic.naver.com/api/article/list?titleId=${row.id}&page=1
    `);
    const { totalPages: pageNumber, totalRows: chapterNumber } = response.data.pageInfo;
    const pageList = Array.from({ length: pageNumber }, (_, index) => index + 1);
    for await (const page of pageList) {
      try {
        const res = await axios.get(`https://comic.naver.com/api/article/list?titleId=${row.id}&page=${page}`);
        res.data.articleList.forEach((article) => {
          chapters.push({
            id: article.no,
            webtoonId: row.id,
            name: article.subtitle.replaceAll("'", " ").replaceAll('"', " "),
            uploadDate: article.serviceDateDescription,
            thumbnail: article.thumbnailUrl,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log(`${check}번째 웹툰 페이지 크롤링 완료`);
    check += 1;
  }

  let i = 1;
  for await (const chapter of chapters) {
    try {
      const response = await axios.get(
        `https://comic.naver.com/api/userAction/info?titleId=${chapter.webtoonId}&no=${chapter.id}`
      );
      const { starScore, averageStarScore } = response?.data?.starInfo;
      chapter.totalStar = starScore;
      chapter.averageStar = averageStarScore;
      console.log(`Chapter 크롤링 ${i}개 완료`);
      i = i + 1;
    } catch (error) {
      console.log(error);
    }
  }
  connection.end();
  return chapters;
};

const crawlingMondayChapter = () => crawlingChapter("Monday");
const crawlingTuesdayChapter = () => crawlingChapter("Tuesday");
const crawlingWednesdayChapter = () => crawlingChapter("Wednesday");
const crawlingThursdayChapter = () => crawlingChapter("Thursday");
const crawlingFridayChapter = () => crawlingChapter("Friday");
const crawlingSaturdayChapter = () => crawlingChapter("Saturday");
const crawlingSundayChapter = () => crawlingChapter("Sunday");

const crawlingAllChapter = async () => {
  let chapters = [];
  let data = await crawlingMondayChapter();
  chapters = chapters.concat(data);
  data = await crawlingTuesdayChapter;
  chapters = chapters.concat(data);
  data = await crawlingWednesdayChapter;
  chapters = chapters.concat(data);
  data = await crawlingThursdayChapter;
  chapters = chapters.concat(data);
  data = await crawlingFridayChapter;
  chapters = chapters.concat(data);
  data = await crawlingSaturdayChapter;
  chapters = chapters.concat(data);
  data = await crawlingSundayChapter;
  chapters = chapters.concat(data);
  return chapters;
};

exports.crawlingWebtoon = crawlingWebtoon;
exports.crawlingAllChapter = crawlingAllChapter;
