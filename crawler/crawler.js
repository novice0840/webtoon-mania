// puppeteer을 가져온다.
const connection = require("./database");
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

const getHTMLSelector = async (url, wait) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://comic.naver.com/webtoon");
  await scrollDownToBottom(page);

  const content = await page.content();
  await browser.close();
  return cheerio.load(content);
};

const scrollDownToBottom = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 1000;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const insertWebtoonBaseInfo = async () => {
  webtoonListInfo = [];
  test = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  // 스크롤을 맨 밑까지 내려야 제대로 크롤링이 가능하다
  const $ = await getHTMLSelector("https://comic.naver.com/webtoon", "img.Poster__image--d9XTI");
  const $dayList = $(".WeekdayMainView__daily_all_item--DnTAH");
  $dayList.each((i, $day) => {
    const day = $($day).find(".WeekdayMainView__heading--tHIYj").text();
    const $webtoonList = $($day).find(".DailyListItem__item--LP6_T");
    $webtoonList.each((j, $webtoon) => {
      test[i] += 1;
      const id = $($webtoon).find("a.Poster__link--sopnC").attr("href").split("=")[1];
      webtoonBaseInfo = {
        id,
        title: $($webtoon).find("span.text").text(),
        day,
        thumbnail: $($webtoon).find("img.Poster__image--d9XTI").attr("src"),
      };
      // connection.query(
      //   `insert into webtoon_base_info(id,title,day,thumbnail) value("${webtoonBaseInfo.id}", "${webtoonBaseInfo.title}","${webtoonBaseInfo.day}","${webtoonBaseInfo.thumbnail}")`,
      //   (err, results) => {
      //     if (err) {
      //       console.error(err);
      //     }
      //     console.log(results);
      //   }
      // );
    });
  });
  // 목요웹툰 3개, 금요웹툰 4개, 토요웹툰 3개, 일요웹툰 4개 부족
  console.log(test);
  connection.end();
};

insertWebtoonBaseInfo();
