import { WebtoonSort, WebtoonBase } from "@src/types/webtoon";

const compareTitle = (a: WebtoonBase, b: WebtoonBase) => {
  if (a.title > b.title) {
    return 1;
  } else if (a.title < b.title) {
    return -1;
  }
  return 0;
};

const compareOld = (a: WebtoonBase, b: WebtoonBase) => {
  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  }
  return 0;
};

const compareNew = (a: WebtoonBase, b: WebtoonBase) => {
  if (a.id < b.id) {
    return 1;
  } else if (a.id > b.id) {
    return -1;
  }
  return 0;
};

const compareInterest = (a: WebtoonBase, b: WebtoonBase) => {
  if (a.interestCount < b.interestCount) {
    return 1;
  } else if (a.interestCount > b.interestCount) {
    return -1;
  }
  return 0;
};

const compareStar = (a: WebtoonBase, b: WebtoonBase) => {
  if (a.starScore < b.starScore) {
    return 1;
  } else if (a.starScore > b.starScore) {
    return -1;
  }
  return 0;
};

export const compareConverter: Record<WebtoonSort, (a: WebtoonBase, b: WebtoonBase) => -1 | 0 | 1> = {
  title: compareTitle,
  old: compareOld,
  new: compareNew,
  interest: compareInterest,
  star: compareStar,
};
