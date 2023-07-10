import { atom } from "recoil";
import { webtoon, weekday } from "types";

const allwebtoonState = atom<webtoon[]>({
  key: "allwebtoonState",
  default: [],
});

const weekdayState = atom({
  key: "weekdayState",
  default: "all",
});

export { allwebtoonState, weekdayState };
