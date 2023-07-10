import React from "react";
import { WebtoonListWrapper } from "./styled";
import { webtoon } from "types";
import { useRecoilState } from "recoil";
import { weekdayState } from "recoil/state";
import { useNavigate } from "react-router-dom";

const WebtoonList = ({ webtoonList }: { webtoonList: webtoon[] }) => {
  const [weekday, setWeekday] = useRecoilState(weekdayState);
  const navigate = useNavigate();
  const handleClick = (element: webtoon) => {
    if (element.weekday !== weekday) {
      setWeekday(element.weekday);
    }
    navigate(`/webtoon/${element.titleId}`);
  };
  return (
    <WebtoonListWrapper>
      {webtoonList.map((element, i) => (
        <div key={i} onClick={() => handleClick(element)} className="webtoon-box">
          <img src={element.thumb}></img>
          <div className="title">{element.title}</div>
        </div>
      ))}
    </WebtoonListWrapper>
  );
};

export default WebtoonList;
