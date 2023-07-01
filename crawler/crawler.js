// puppeteer을 가져온다.
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

const getHTMLSelector = async (url, wait) => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(wait);
  const content = await page.content();
  browser.close();
  return cheerio.load(content);
};

const getAllWebtoon = async () => {
  webtoonListInfo = [];
  // lazy loading 때문에 가장 늦게 오는 이미지를 기준으로 wait해야 한다
  const $ = await getHTMLSelector("https://comic.naver.com/webtoon", "img.Poster__image--d9XTI");
  const $dayList = $(".WeekdayMainView__daily_all_item--DnTAH");
  // console.log($($dayList).find("img.Poster__image--d9XTI").attr("src"));
  // console.log($("img.Poster__image--d9XTI").attr("src"));
  $dayList.each((i, $day) => {
    const day = $($day).find(".WeekdayMainView__heading--tHIYj").text();
    const $webtoonList = $($day).find(".DailyListItem__item--LP6_T");
    if (i == 0) {
      $webtoonList.each((j, $webtoon) => {
        if (j == 0) {
          console.log($($webtoon).find("img.Poster__image--d9XTI").attr("src"));
        }
        // console.log({
        //   id: $($webtoon).find("img.Poster__image--d9XTI").attr("alt"),
        //   title: $($webtoon).find("span.text").text(),
        //   day,
        //   thumbnail: $($webtoon).find("img.Poster__image--d9XTI").attr("src"),
        // });
      });
    }
  });
};

getAllWebtoon();
