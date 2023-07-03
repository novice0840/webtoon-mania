// puppeteer을 가져온다.
const connection = require("./database");
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

const getHTMLSelector = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(url);
  await scrollDownToBottom(page);
  const content = await page.content();
  await browser.close();
  return cheerio.load(content);
};

const scrollDownToBottom = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
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
};

// 가장 초기에 모든 웹툰들의 정보를 크롤링에 DB에 insert하는 함수
const insertWebtoonBaseInfo = async () => {
  webtoonListInfo = [];
  // 스크롤을 맨 밑까지 내려야 제대로 크롤링이 가능하다
  const $ = await getHTMLSelector("https://comic.naver.com/webtoon");
  const $dayList = $(".WeekdayMainView__daily_all_item--DnTAH");
  $dayList.each((i, $day) => {
    const day = $($day).find(".WeekdayMainView__heading--tHIYj").text();
    const $webtoonList = $($day).find(".DailyListItem__item--LP6_T");
    $webtoonList.each((j, $webtoon) => {
      const id = $($webtoon).find("a.Poster__link--sopnC").attr("href").split("=")[1];
      webtoonBaseInfo = {
        id,
        title: $($webtoon).find("span.text").text(),
        day,
        thumbnail: $($webtoon).find("img.Poster__image--d9XTI").attr("src"),
      };
      connection.query(
        `insert into webtoon_base_info(id,title,day,thumbnail) value("${webtoonBaseInfo.id}", "${webtoonBaseInfo.title}","${webtoonBaseInfo.day}","${webtoonBaseInfo.thumbnail}")`,
        (err, results) => {
          if (err) {
            console.error(err);
          }
        }
      );
    });
  });
  connection.end();
};

// 각 챕터의 comment와 like가 다른 URL에 있어 따로 함수를 분리함
const getCommentNumberAndLike = async (webtoonId, chapterId) => {
  // like = em.u_cnt_count
  // comment_number = span.u_cbox_count
  const $ = await getHTMLSelector(`https://comic.naver.com/webtoon/detail?titleId=${webtoonId}&no=${chapterId}`);
  console.log({
    like: $("a.u_likeit_list_btn _button off > em.u_cnt_count").text(),
    commentNumer: $("span.u_cbox_count").text(),
  });
};

const getPageNumber = async (webtoonId) => {
  const $ = await getHTMLSelector(`https://comic.naver.com/webtoon/list?titleId=${webtoonId}`);
  const lastChapter = $("li.EpisodeListList__item--M8zq4")
    .first()
    .find("a.EpisodeListList__link--DdClU")
    .attr("href")
    .split("=")[2];
  return parseInt(lastChapter / 20) + 1;
};

const insertWebtoonChapter = async (webtoonId, webpage) => {
  const pageNumber = await getPageNumber(webtoonId);
  let pages = [];
  for (let i = 1; i <= pageNumber; i++) {
    pages.push(i);
  }
  for await (const page of pages) {
    await webpage.goto(`https://comic.naver.com/webtoon/list?titleId=${webtoonId}&page=${page}`);
    await scrollDownToBottom(webpage);
    const content = await webpage.content();
    const $ = cheerio.load(content);
    $("li.EpisodeListList__item--M8zq4").each((index, element) => {
      const chapterInfo = {
        id: parseInt($(element).find("a.EpisodeListList__link--DdClU").attr("href").split("=")[2]),
        webtoonId,
        name: $(element).find("span.EpisodeListList__title--lfIzU").text(),
        star: parseFloat($(element).find("span.text").text()),
        upload_data: $(element).find("span.date").text(),
        thumbnail: $(element).find("img").attr("src"),
        comment_number: 0,
        like: 0,
      };
      connection.query(
        `insert into webtoon_chapter_info(id,webtoon_id, name, star, upload_data, thumbnail) 
        value(${chapterInfo.id}, "${chapterInfo.webtoonId}","${chapterInfo.name}" ,${chapterInfo.star},"${chapterInfo.upload_data}","${chapterInfo.thumbnail}")`,
        (err, results) => {
          if (err) {
            console.error(err);
          }
        }
      );
    });
  }
};

const test = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const webpage = await browser.newPage();
  // await insertWebtoonChapter(570506, webpage);
  await insertWebtoonChapter(597447, webpage);
  // await insertWebtoonChapter(602910, webpage);
  // await insertWebtoonChapter(750184, webpage);
  // await insertWebtoonChapter(750558, webpage);
  // await insertWebtoonChapter(750826, webpage);
  // await insertWebtoonChapter(751168, webpage);
  // await insertWebtoonChapter(751993, webpage);
  // await insertWebtoonChapter(751999, webpage);
  // await insertWebtoonChapter(752414, webpage);
  // await insertWebtoonChapter(752532, webpage);
  console.log("END");
  await browser.close();
  await connection.end();
};

test();

// 각 챕터의 좋아요 수와 댓글 수를 제외한 정보를 DB에 insert하는 함수
const insertWebtoonsChapter = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const webpage = await browser.newPage();
  connection.query("select id from webtoon_base_info;", (err, results) => {
    let i = 1;
    results.map((result) => {
      insertWebtoonChapter(result.id, webpage);
      console.log(`${result.id} 완료: ${i}개째`);
      i += 1;
    });
  });
  await browser.close();
  connection.end();
};
