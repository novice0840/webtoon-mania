import { getOneWebtoon } from "@src/api/webtoon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Chapter } from "@src/types/webtoon";
import { Container } from "@mui/material";
import Header from "@src/components/Header";
import ChapterChart from "@src/components/ChapterChart";
import ChapterGrid from "@src/components/ChapterGrid";

const Webtoon = () => {
  const { id } = useParams(); // params;
  const { isLoading, isError, data }: UseQueryResult<Chapter[], unknown> = useQuery({
    queryKey: ["getOneWebtoon", id],
    queryFn: () => getOneWebtoon(id ?? "783053"),
  });
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
      <ChapterGrid data={data} />
    </Container>
  );
};

export default Webtoon;
