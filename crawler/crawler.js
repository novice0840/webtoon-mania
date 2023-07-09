const connection = require("./database");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mysql = require("mysql2/promise");
const axios = require("axios");

const db_init = async () => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "naverwebtoon_analyzer",
    password: "password",
  });
  return connection;
};

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
      const distance = 1000;
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

const getPageNumber = async (webtoonId) => {
  const $ = await getHTMLSelector(`https://comic.naver.com/webtoon/list?titleId=${webtoonId}`);
  // 성인웹툰의 경우 회차목록을 볼 수가 없으므로 page 수를 알 수 없다
  const lastChapter = $("li.EpisodeListList__item--M8zq4")
    .first()
    .find("a.EpisodeListList__link--DdClU")
    .attr("href")
    ?.split("=")[2];
  return lastChapter ? parseInt((lastChapter - 1) / 20) + 1 : 0;
};

const insertWebtoonChapter = async (webtoonId, webpage, connection) => {
  const pageNumber = await getPageNumber(webtoonId);
  let pages = [];
  for (let i = 1; i <= pageNumber; i++) {
    pages.push(i);
  }
  for await (const page of pages) {
    // const [rows, field] = connection.execute(`select * from webtoon_chapter_info where `)
    await webpage.goto(`https://comic.naver.com/webtoon/list?titleId=${webtoonId}&page=${page}`);
    await scrollDownToBottom(webpage);
    let content = await webpage.content();
    const $ = cheerio.load(content);
    $("li.EpisodeListList__item--M8zq4").each((index, element) => {
      const chapterInfo = {
        id: $(element).find("a.EpisodeListList__link--DdClU").attr("href").split("=")[2],
        webtoonId,
        name: $(element).find("span.EpisodeListList__title--lfIzU").text().replaceAll("'", "").replaceAll('"', ""),
        star: parseFloat($(element).find("span.text").text()),
        upload_data: $(element).find("span.date").text(),
        thumbnail: $(element).find("img").attr("src"),
        comment_number: 0,
        like: 0,
      };

      try {
        connection.execute(
          `insert into webtoon_chapter_info(id,webtoon_id, name, star, upload_data, thumbnail) 
          value(${chapterInfo.id}, "${chapterInfo.webtoonId}","${chapterInfo.name}" ,${chapterInfo.star},"${chapterInfo.upload_data}","${chapterInfo.thumbnail}")`
        );
      } catch (error) {
        console.log(error);
      }
    });
  }
};

// 각 챕터의 좋아요 수와 댓글 수를 제외한 정보를 DB에 insert하는 함수
const insertAllWebtoonsChapter = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const webpage = await browser.newPage();
  const connection = await db_init();
  const [rows, fields1] = await connection.execute("select id from webtoon_base_info;");
  const [existRows, fields2] = await connection.execute(
    "select webtoon_id from webtoon_chapter_info group by webtoon_id;"
  );
  let filteredRows = rows
    .map((row) => row.id)
    .filter((row) => {
      let existRowValues = existRows.flatMap(Object.values);
      return !existRowValues.some((value) => value == row);
    });
  let i = 1;
  for await (const filteredRow of filteredRows) {
    await insertWebtoonChapter(filteredRow, webpage, connection);
    console.log(`${filteredRow} 완료: ${i}개째`);
    i += 1;
  }
  await browser.close();
  connection.end();
};

// 각 챕터의 comment와 like가 다른 URL에 있어 따로 함수를 분리함
const insertCommentNumberAndLike = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const connection = await db_init();
  const [rows, field] = await connection.execute(
    `select id,webtoon_id from webtoon_chapter_info where \`like\`=0 and comment_number=0`
  );
  let i = 1;
  for await (const row of rows) {
    await page.goto(`https://comic.naver.com/webtoon/detail?titleId=${row.webtoon_id}&no=${row.id}`);
    let content = await page.content();
    const $ = cheerio.load(content);
    const like = $(".u_likeit_list_btn").children().eq(2).text().replaceAll(",", "").replaceAll("+", "")
      ? $(".u_likeit_list_btn").children().eq(2).text().replaceAll(",", "").replaceAll("+", "")
      : 0;
    const commentNumber = $("span.u_cbox_count").text().replaceAll(",", "")
      ? $("span.u_cbox_count").text().replaceAll(",", "")
      : 0;
    await connection.execute(
      `update webtoon_chapter_info set \`like\`=${like}, comment_number=${commentNumber} where id=${row.id} and webtoon_id=${row.webtoon_id}`
    );
    console.log(`${i}개 완료`);
    i += 1;
  }

  browser.close();
  connection.end();
};

// 각 웹툰의 좋아요 수를 Update하는 함수
const updateInterestCount = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const connection = await db_init();
  const [rows, field] = await connection.execute(`select id from webtoon_base_info`);
  let i = 1;
  for await (const row of rows) {
    await page.goto(`https://comic.naver.com/webtoon/detail?titleId=${row.id}&no=1`);
    let content = await page.content();
    const $ = cheerio.load(content);
    const interestCount = $(
      "button.UserAction__item--vnknf.UserAction__favorite--xLZK0 > span.UserAction__count--jk3vo"
    ).text()
      ? $("button.UserAction__item--vnknf.UserAction__favorite--xLZK0 > span.UserAction__count--jk3vo")
          .text()
          .replaceAll(",", "")
      : 0;
    await connection.execute(`update webtoon_base_info set interest_count=${interestCount} where id=${row.id}`);
    console.log(`${i}개 완료`);
    i += 1;
  }

  await browser.close();
  connection.end();
};

// 각 chapter의 별점을 update하는 함수
const updateChapterStar = async () => {
  const connection = await db_init();
  const [rows, field] = await connection.execute(`select id, webtoon_id from webtoon_chapter_info`);
  let i = 1;
  for await (const row of rows) {
    const response = await axios.get(
      `https://comic.naver.com/api/userAction/info?titleId=${row.webtoon_id}&no=${row.id}`
    );
    const { starScore, averageStarScore } = response.data.starInfo;
    await connection.execute(
      `update webtoon_chapter_info set total_star=${starScore}, average_star=${averageStarScore} where id=${row.id} and webtoon_id=${row.webtoon_id}`
    );

    console.log(`${i}개 완료`);
    i += 1;
  }
  connection.end();
};
