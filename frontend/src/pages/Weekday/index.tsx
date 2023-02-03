import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { weekdayState, allwebtoonState } from "recoil/state";
import WebtoonList from "components/WebtoonList";
import { webtoon } from "types";
import { WeekdayWrapper } from "./style";

const weekday = () => {
  const params = useParams();
  const currentWeekday = params.weekday;
  const [weekday, setWeekday] = useRecoilState(weekdayState);
  const allwebtoon: webtoon[] = useRecoilValue(allwebtoonState);
  useEffect(() => {
    setWeekday(currentWeekday ?? "all");
  }, []);
  return (
    <WeekdayWrapper>
      <WebtoonList webtoonList={allwebtoon.filter((n) => n.weekday === weekday)} />
    </WeekdayWrapper>
  );
};

export default weekday;
