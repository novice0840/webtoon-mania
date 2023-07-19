const { insertWebtoons, insertChapters } = require("./insert");
const { crawlingAllChapter, crawlingWebtoon } = require("./crawling");

const init = async () => {
  const webtoons = await crawlingWebtoon();
  await insertWebtoons(webtoons);
  const chapters = await crawlingAllChapter();
  await insertChapters(chapters);
};

init();
