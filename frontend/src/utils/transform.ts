import { Day, DayKorean, WebtoonSort, WebtoonSortKorean, Tag } from "@src/types/webtoon";

export const dayOfWeekConverter: Record<Day, DayKorean> = {
  MONDAY: "월요웹툰",
  TUESDAY: "화요웹툰",
  WEDNESDAY: "수요웹툰",
  THURSDAY: "목요웹툰",
  FRIDAY: "금요웹툰",
  SATURDAY: "토요웹툰",
  SUNDAY: "일요웹툰",
};

export const webtoonSorts: { value: WebtoonSort; label: WebtoonSortKorean }[] = [
  { value: "title", label: "제목순" },
  { value: "old", label: "오래된순" },
  { value: "new", label: "최신순" },
  { value: "interest", label: "관심웹툰순" },
  { value: "star", label: "별점순" },
];

export const webtoonDayOfWeeks: { value: Day; label: DayKorean }[] = [
  { value: "MONDAY", label: "월요웹툰" },
  { value: "TUESDAY", label: "화요웹툰" },
  { value: "WEDNESDAY", label: "수요웹툰" },
  { value: "THURSDAY", label: "목요웹툰" },
  { value: "FRIDAY", label: "금요웹툰" },
  { value: "SATURDAY", label: "토요웹툰" },
  { value: "SUNDAY", label: "일요웹툰" },
];

export const webtoonTags: Tag[] = [
  "#로맨스",
  "#판타지",
  "#액션",
  "#일상",
  "#스릴러",
  "#개그",
  "#무협/사극",
  "#드라마",
  "#감성",
  "#스포츠",
  "#연도별웹툰",
  "#브랜드웹툰",
  "#드라마&영화 원작웹툰",
  "#먼치킨",
  "#학원로맨스",
  "#로판",
  "#게임판타지",
  "#까칠남",
  "#서스펜스",
  "#무해한",
  "#음악",
  "#스핀오프",
  "#힐링",
  "#괴담",
  "#퓨전사극",
  "#러블리",
  "#서바이벌",
  "#소년왕도물",
];
