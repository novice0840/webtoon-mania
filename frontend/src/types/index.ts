type weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type webtoon = {
  title: string;
  titleId: string;
  weekday: string;
  thumb: string;
};

type webtoonContent = {
  chapter: number;
  thumb: string;
  title: string;
};

type bestComment = {
  name: string;
  text: string;
  like: string;
  dislike: string;
  date: string;
};

export type { weekday, webtoon, webtoonContent, bestComment };
