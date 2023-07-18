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
  totalStar: number;
  thumbnail: string;
  uploadDate: string;
};

export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
export type DayKorean = "월요웹툰" | "화요웹툰" | "수요웹툰" | "목요웹툰" | "금요웹툰" | "토요웹툰" | "일요웹툰";
export type WebtoonSort = "title" | "old" | "new" | "interest" | "star";
export type WebtoonSortKorean = "제목순" | "오래된순" | "최신순" | "관심웹툰순" | "별점순";
export type ChapterSort = "averageStar" | "totalStar" | "old" | "new";
export type ChapterSortKorean = "평균별점순" | "총별점순" | "오랜된순" | "최신순";

export type Tag =
  | "#로맨스"
  | "#판타지"
  | "#액션"
  | "#일상"
  | "#스릴러"
  | "#개그"
  | "#무협/사극"
  | "#드라마"
  | "#감성"
  | "#스포츠"
  | "#연도별웹툰"
  | "#브랜드웹툰"
  | "#드라마&영화 원작웹툰"
  | "#먼치킨"
  | "#학원로맨스"
  | "#로판"
  | "#게임판타지"
  | "#까칠남"
  | "#서스펜스"
  | "#무해한"
  | "#음악"
  | "#스핀오프"
  | "#힐링"
  | "#괴담"
  | "#퓨전사극"
  | "#러블리"
  | "#서바이벌"
  | "#소년왕도물";
