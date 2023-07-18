import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { WebtoonBase, Day, WebtoonSort, Tag } from "@src/types/webtoon";
import { compareConverter } from "@src/utils/compare";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getAllWebtoon } from "@src/api/webtoon";
import { dayOfWeekConverter } from "@src/utils/transform";

type PropTypes = {
  search: string;
  days: Day[];
  webtoonSort: WebtoonSort;
  tags: Tag[];
  tagsOrAnd: "or" | "and";
  daysOrAnd: "or" | "and";
};

const WebtoonGrid = ({ search, days, webtoonSort, tags, tagsOrAnd, daysOrAnd }: PropTypes) => {
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
    <Grid container rowSpacing={1} spacing={1}>
      {data
        ?.slice()
        .filter((webtoon) => search === "" || webtoon.title.includes(search))
        .filter(
          (webtoon) =>
            tags.length === 0 ||
            (tagsOrAnd === "or"
              ? tags.some((tag) => webtoon.tags.includes(tag))
              : tags.every((tag) => webtoon.tags.includes(tag)))
        )
        .filter(
          (webtoon) =>
            days.length === 0 ||
            (daysOrAnd === "or"
              ? days.some((day) => webtoon.dayOfWeek.includes(day))
              : days.every((day) => webtoon.dayOfWeek.includes(day)))
        )
        .sort(compareConverter[webtoonSort])
        .map((webtoon: WebtoonBase) => (
          <Grid item xs={6} sm={3} md={2} key={webtoon.id}>
            <Link style={{ textDecoration: "none" }} to={"/webtoon/" + webtoon.id.toString()}>
              <Paper elevation={5}>
                <img src={webtoon.thumbnail} width={160} height={207} alt="" />
                <Typography color="primary">{webtoon.title}</Typography>
                <Typography color="secondary">
                  {webtoon.dayOfWeek.map((day) => `${dayOfWeekConverter[day]}`)}
                </Typography>
                <Typography color="textPrimary">별점: {webtoon.starScore}</Typography>
                <Typography color="textPrimary">관심웹툰: {webtoon.interestCount}</Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default WebtoonGrid;
