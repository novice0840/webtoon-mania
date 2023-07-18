import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { WebtoonBase, Day, WebtoonSort } from "@src/types/webtoon";
import { compareConverter } from "@src/utils/compare";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getAllWebtoon } from "@src/api/webtoon";

// const dayConverter: Record<string, Day> = {
//   월요웹툰: "monday",
//   화요웹툰: "tuesday",
//   수요웹툰: "wednesday",
//   목요웹툰: "thusday",
//   금요웹툰: "friday",
//   토요웹툰: "saturday",
//   일요웹툰: "sunday",
// };

type PropTypes = {
  search: string;
  days: Day[];
  webtoonSort: WebtoonSort;
};

const WebtoonGrid = ({ search, days, webtoonSort }: PropTypes) => {
  const { isLoading, isError, data }: UseQueryResult<WebtoonBase[], unknown> = useQuery({
    queryKey: ["getAllWebtoon"],
    queryFn: () => getAllWebtoon(),
  });

  if (isLoading) {
    return <div>잠시만 기다려주세요 로딩중입니다</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <Grid container spacing={2}>
      {data
        ?.slice()
        .filter((webtoon) => webtoon.title.includes(search) || search === "")
        .filter((webtoon) => days.some((day) => webtoon.dayOfWeek.includes(day)) || days.length === 0)
        .sort(compareConverter[webtoonSort])
        .map((webtoon: WebtoonBase) => (
          <Grid item xs={2} key={webtoon.id}>
            <Link style={{ textDecoration: "none" }} to={"/webtoon/" + webtoon.id.toString()}>
              <Paper elevation={5}>
                <img src={webtoon.thumbnail} width={160} height={207} alt="" />
                <div>{webtoon.title}</div>
                <div>{webtoon.dayOfWeek}</div>
                <div>별점: {webtoon.starScore}</div>
                <div>관심웹툰: {webtoon.interestCount}</div>
              </Paper>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default WebtoonGrid;
