const autoScroll: (Page) => Promise<void> = async (page) => {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
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

const sleep: (ms: number) => void = (ms) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

const convertToNumber: (str: string) => number = (str) => {
  const tenThousand = 10000; // 1만의 값
  const tenMillion = 100000000;
  let number;
  if (str.endsWith('만')) {
    number = parseFloat(str) * tenThousand; // 문자열에서 숫자 부분 추출
  } else if (str.endsWith('억')) {
    number = parseFloat(str) * tenMillion; // 문자열에서 숫자 부분 추출
  } else {
    number = parseFloat(str); // 문자열에서 숫자 부분 추출
  }
  return !isNaN(number) ? number : 0;
};

export { autoScroll, sleep, convertToNumber };
