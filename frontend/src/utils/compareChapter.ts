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
  if (a.average_star < b.average_star) {
    return 1;
  } else if (a.average_star > b.average_star) {
    return -1;
  }
  return 0;
};

const compareTotalStar = (a: Chapter, b: Chapter) => {
  if (a.total_star < b.total_star) {
    return 1;
  } else if (a.total_star > b.total_star) {
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
