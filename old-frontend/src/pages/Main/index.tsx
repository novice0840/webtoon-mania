import React from "react";
import { allwebtoonState } from "recoil/state";
import { useRecoilValue } from "recoil";
import { MainWrapper, WeekdayColumn } from "./style";
import WebtoonList from "components/WebtoonList";
import { webtoon } from "types";

const main = () => {
  const weekdayMatch = [
    ["월", "mon"],
    ["화", "tue"],
    ["수", "wed"],
    ["목", "tue"],
    ["금", "fri"],
    ["토", "sat"],
    ["일", "sun"],
  ];
  const allwebtoon: webtoon[] = useRecoilValue(allwebtoonState);

  return (
    <MainWrapper>
      {weekdayMatch.map((element, i) => (
        <WeekdayColumn key={i}>
          <div className="day">{element[0]}요웹툰</div>
          <WebtoonList webtoonList={allwebtoon.filter((n) => n.weekday === element[1])} />
        </WeekdayColumn>
      ))}
    </MainWrapper>
  );
};

export default main;
