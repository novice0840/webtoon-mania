const cheerio = require("cheerio");

// 예시로 사용할 HTML 코드
const html = `
<img class="Poster__image--d9XTI" src="https://image-comic.pstatic.net/webtoon/648419/thumbnail/thumbnail_IMAG21_d9398229-cbfd-47dc-9208-0a6fb936f3a7.jpg" alt="뷰티풀 군바리">
`;

// HTML을 로드하여 $ 변수에 할당
const $ = cheerio.load(html);

// img 태그 선택
const imgTags = $("img");

// img 태그를 순회하며 필요한 작업 수행
imgTags.each((index, element) => {
  const src = $(element).attr("src");
  const alt = $(element).attr("alt");
  console.log(`Image ${index + 1}: src=${src}, alt=${alt}`);
});
