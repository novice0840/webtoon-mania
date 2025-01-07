import { Chapter, ChapterSort } from "@src/types/webtoon";

const compareOld = (a: Chapter, b: Chapter) => {
  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  }
  return 0;
};

const compareNew = (a: Chapter, b: Chapter) => {
  if (a.id < b.id) {
    return 1;
  } else if (a.id > b.id) {
    return -1;
  }
  return 0;
};

const compareAverageStar = (a: Chapter, b: Chapter) => {
  if (a.averageStar < b.averageStar) {
    return 1;
  } else if (a.averageStar > b.averageStar) {
    return -1;
  }
  return 0;
};

const compareTotalStar = (a: Chapter, b: Chapter) => {
  if (a.totalStar < b.totalStar) {
    return 1;
  } else if (a.totalStar > b.totalStar) {
    return -1;
  }
  return 0;
};

export const compareChapterConverter: Record<ChapterSort, (a: Chapter, b: Chapter) => -1 | 0 | 1> = {
  old: compareOld,
  new: compareNew,
  averageStar: compareAverageStar,
  totalStar: compareTotalStar,
};
