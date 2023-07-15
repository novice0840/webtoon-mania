import { Sort, Webtoon } from "@src/types/webtoon";

const compareTitle = (a: Webtoon, b: Webtoon) => {
  if (a.title > b.title) {
    return 1;
  } else if (a.title < b.title) {
    return -1;
  }
  return 0;
};

const compareOld = (a: Webtoon, b: Webtoon) => {
  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  }
  return 0;
};

const compareNew = (a: Webtoon, b: Webtoon) => {
  if (a.id < b.id) {
    return 1;
  } else if (a.id > b.id) {
    return -1;
  }
  return 0;
};

const compareInterest = (a: Webtoon, b: Webtoon) => {
  if (a.interest_count < b.interest_count) {
    return 1;
  } else if (a.interest_count > b.interest_count) {
    return -1;
  }
  return 0;
};

const compareStar = (a: Webtoon, b: Webtoon) => {
  if (a.title > b.title) {
    return 1;
  } else if (a.title < b.title) {
    return -1;
  }
  return 0;
};

export const compareConverter: Record<Sort, (a: Webtoon, b: Webtoon) => -1 | 0 | 1> = {
  title: compareTitle,
  old: compareOld,
  new: compareNew,
  interest: compareInterest,
  star: compareStar,
};
