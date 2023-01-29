type weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type webtoon = {
  title: string;
  titleId: string;
  weekday: string;
  thumb: string;
};

export type { weekday, webtoon };
