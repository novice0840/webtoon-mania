import React, { ReactElement } from "react";
import { LayoutWrapper } from "./style";
import { useParams } from "react-router-dom";
import { weekdayState } from "recoil/state";
import { useRecoilValue } from "recoil";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const weekday = useRecoilValue(weekdayState);
  const active = Array(8).fill(false);
  switch (weekday) {
    case "mon":
      active[1] = true;
      break;
    case "tue":
      active[2] = true;
      break;

    case "wed":
      active[3] = true;
      break;

    case "thu":
      active[4] = true;
      break;

    case "fri":
      active[5] = true;
      break;

    case "sat":
      active[6] = true;
      break;

    case "sun":
      active[7] = true;
      break;

    default:
      active[0] = true;
  }
  return (
    <LayoutWrapper>
      <header>NAVER 웹툰 베스트 댓글 크롤링</header>
      <nav>
        <div className={`weekday ${active[0] ? "selected-weekday" : ""}`}>요일전체</div>
        <div className={`weekday ${active[1] ? "selected-weekday" : ""}`}>월요웹툰</div>
        <div className={`weekday ${active[2] ? "selected-weekday" : ""}`}>화요웹툰</div>
        <div className={`weekday ${active[3] ? "selected-weekday" : ""}`}>수요웹툰</div>
        <div className={`weekday ${active[4] ? "selected-weekday" : ""}`}>목요웹툰</div>
        <div className={`weekday ${active[5] ? "selected-weekday" : ""}`}>금요웹툰</div>
        <div className={`weekday ${active[6] ? "selected-weekday" : ""}`}>토요웹툰</div>
        <div className={`weekday ${active[7] ? "selected-weekday" : ""}`}>일요웹툰</div>
      </nav>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
