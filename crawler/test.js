const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://comic.naver.com/webtoon");
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  console.log("test1");
  await scrollDownToBottom(page);
  console.log("test2");
  await page.screenshot({
    path: "yoursite.png",
    fullPage: true,
  });
  console.log("test3");
  await browser.close();
})();

async function scrollDownToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const totalHeight = 0;
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
}
