import { getOneWebtoon } from "@src/api/webtoon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Chapter } from "@src/types/webtoon";
import { Box, Container } from "@mui/material";
import Header from "@src/components/Header";
import { LineChart } from "@mui/x-charts";

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
      <LineChart
        xAxis={[{ data: [...data.map((chapter) => chapter.id)] }]}
        series={[
          {
            data: [...data.map((chapter) => chapter.total_star)],
          },
        ]}
        width={1000}
        height={300}
      />
      <Box>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.map((chapter: Chapter) => (
            <Link style={{ textDecoration: "none" }} key={chapter.id} to={"/chapter/" + chapter.id.toString()}>
              <div key={chapter.id}>
                <img src={chapter.thumbnail} width={106} height={62} alt="" />
                <div>{chapter.name}</div>
                <div>{chapter.upload_data.split("T")[0]}</div>
                <div>평균 별점{chapter.average_star}</div>
                <div>별점 총합{chapter.total_star}</div>
              </div>
            </Link>
          ))}
        </div>
      </Box>
    </Container>
  );
};

export default Webtoon;
