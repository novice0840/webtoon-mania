import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { weekdayState } from "recoil/state";

const weekday = () => {
  const params = useParams();
  const currentWeekday = params.weekday;
  const [weekday, setWeekday] = useRecoilState(weekdayState);
  useEffect(() => {
    setWeekday(currentWeekday ?? "all");
  }, []);
  return <div>{weekday}</div>;
};

export default weekday;
