export type WebtoonBase = Omit<WebtoonDetail, "description" | "chapters">;

export type WebtoonDetail = {
  id: number;
  title: string;
  dayOfWeek: Day[];
  thumbnail: string;
  interestCount: number;
  starScore: number;
  description: string;
  tags: string[];
  chapters: Chapter[];
};

export type Chapter = {
  id: number;
  name: string;
  averageStar: number;
  thumbnail: string;
  uploadDate: string;
};

export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export type WebtoonSort = "title" | "old" | "new" | "interest" | "star";

export type ChapterSort = "averageStar" | "totalStar" | "old" | "new";
