export interface WebtoonInfo {
  id: number;
  title: string;
  day: "월요웹툰" | "화요웹툰" | "수요웹툰" | "목요웹툰" | "금요웹툰" | "토요웹툰" | "일요웹툰";
  thumbnail: string;
  interest_count: number;
}
