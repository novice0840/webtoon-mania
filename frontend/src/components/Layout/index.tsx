import React, { MouseEvent, useState, useEffect } from "react";
import { LayoutWrapper } from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { weekdayState } from "recoil/state";
import { useRecoilState } from "recoil";
import ButtonToShowCurrentSubscriptions from "components/ButtonToShowCurrentSubscriptions";
import { getAllWebtoon } from "api/cralwer";
import { allwebtoonState } from "recoil/state";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [weekday, setWeekday] = useRecoilState(weekdayState);
  const params = useParams();
  const navigate = useNavigate();
  const active = Array(8).fill(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [allwebtoon, setAllwebtoon] = useRecoilState(allwebtoonState);

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
  const handleClick = (e: MouseEvent) => {
    setWeekday(e.currentTarget.classList[0]);
    if (e.currentTarget.classList[0] == "all") {
      navigate("/");
      return;
    }
    navigate(`/weekday/${e.currentTarget.classList[0]}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const data = await getAllWebtoon();
        setAllwebtoon(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <LayoutWrapper>
      <ButtonToShowCurrentSubscriptions />
      <header>NAVER 웹툰 베스트 댓글 크롤링</header>
      <nav>
        <div onClick={handleClick} className={`all weekday ${active[0] ? "selected-weekday" : ""}`}>
          요일전체
        </div>
        <div onClick={handleClick} className={`mon weekday ${active[1] ? "selected-weekday" : ""}`}>
          월요웹툰
        </div>
        <div onClick={handleClick} className={`tue weekday ${active[2] ? "selected-weekday" : ""}`}>
          화요웹툰
        </div>
        <div onClick={handleClick} className={`wed weekday ${active[3] ? "selected-weekday" : ""}`}>
          수요웹툰
        </div>
        <div onClick={handleClick} className={`thu weekday ${active[4] ? "selected-weekday" : ""}`}>
          목요웹툰
        </div>
        <div onClick={handleClick} className={`fri weekday ${active[5] ? "selected-weekday" : ""}`}>
          금요웹툰
        </div>
        <div onClick={handleClick} className={`sat weekday ${active[6] ? "selected-weekday" : ""}`}>
          토요웹툰
        </div>
        <div onClick={handleClick} className={`sun weekday ${active[7] ? "selected-weekday" : ""}`}>
          일요웹툰
        </div>
      </nav>
      {isError && <div>웹툰 로딩 에러</div>}
      {isLoading ? <div>로딩중</div> : children}
    </LayoutWrapper>
  );
};

export default Layout;
