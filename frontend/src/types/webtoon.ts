export type Webtoon = {
  id: number;
  title: string;
  day: "월요웹툰" | "화요웹툰" | "수요웹툰" | "목요웹툰" | "금요웹툰" | "토요웹툰" | "일요웹툰";
  thumbnail: string;
  interest_count: number;
};

export type Chapter = {
  id: number;
  webtoon_id: number;
  name: string;
  upload_data: string;
  thumbnail: string;
  comment_number: number;
  like_count: number;
  average_star: number;
  total_star: number;
};

export type Day = "monday" | "tuesday" | "wednesday" | "thusday" | "friday" | "saturday" | "sunday";

export type Sort = "title" | "old" | "new" | "interest" | "star";
