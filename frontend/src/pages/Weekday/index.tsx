import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { weekdayState } from "recoil/state";
import WebtoonList from "components/WebtoonList";
import mock from "mock.json";
import { webtoon } from "types";
import { WeekdayWrapper } from "./style";

const weekday = () => {
  const params = useParams();
  const currentWeekday = params.weekday;
  const [weekday, setWeekday] = useRecoilState(weekdayState);
  const allwebtoon: webtoon[] = mock;
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
