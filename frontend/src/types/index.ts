export type PlatformKind = "all" | "naver" | "kakao" | "lezhin" | "toptoon" | "toomics";
export type DayOfWeekKind =
  | "Monday"
  | "Thuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | "End";

export type DayOfWeekKorean =
  | "월요웹툰"
  | "화요웹툰"
  | "수요웹툰"
  | "목요웹툰"
  | "금요웹툰"
  | "토요웹툰"
  | "일요웹툰"
  | "완결웹툰";

export type WebtoonBaseType = {
  id: string;
  titleName: string;
  thumbnail: string;
  authors: string[];
};

export type WebtoonDetailType = WebtoonBaseType & {
  titleId: string;
  platform: PlatformKind;
  link: string;
  interestCount: number;
  starScore: number;
  description: string;
  viewCount: number;
  likeCount: number;
  isEnd: boolean;
  dayOfWeeks: string[];
  genres: string[];
};

export type CommentType = {
  id: string;
  content: string;
  like: number;
  dislike: number;
  createAt: Date;
  writerName: string;
  my?: boolean;
};
