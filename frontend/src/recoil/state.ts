import { atom } from "recoil";

const allwebtoonState = atom({
  key: "allwebtoonState",
  default: [1],
});

const weekdayState = atom({
  key: "weekdayState",
  default: "all",
});

export { allwebtoonState, weekdayState };
