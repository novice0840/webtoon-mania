import { getOneWebtoon } from "@src/api/webtoon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Chapter } from "@src/types/webtoon";
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Header from "@src/components/Header";
import ChapterChart from "@src/components/ChapterChart";
import ChapterGrid from "@src/components/ChapterGrid";
import { useState, ChangeEvent } from "react";
import { ChapterSort } from "@src/types/webtoon";

const Webtoon = () => {
  const { id } = useParams(); // params;
  const { isLoading, isError, data }: UseQueryResult<Chapter[], unknown> = useQuery({
    queryKey: ["getOneWebtoon", id],
    queryFn: () => getOneWebtoon(id ?? "783053"),
  });
  const [sortType, setSortType] = useState<ChapterSort>("new");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "sort-group") {
      setSortType(event.target.value as ChapterSort);
    }
  };

  if (isLoading) {
    return <div>잠시만 기다려주세요 로딩중입니다</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <Container maxWidth="lg">
      <Header />
      <ChapterChart data={data} />
      <FormControl sx={{ mb: 5 }}>
        <FormLabel id="demo-row-radio-buttons-group-label">정렬하기</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="sort-group"
          defaultValue="new"
          onChange={handleChange}
        >
          <FormControlLabel value="new" control={<Radio />} label="최신순" />
          <FormControlLabel value="old" control={<Radio />} label="오래된순" />
          <FormControlLabel value="averageStar" control={<Radio />} label="평균 별점순" />
          <FormControlLabel value="totalStar" control={<Radio />} label="총 별점순" />
        </RadioGroup>
      </FormControl>
      <ChapterGrid data={data} sortType={sortType} />
    </Container>
  );
};

export default Webtoon;
