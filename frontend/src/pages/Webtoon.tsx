import { getOneWebtoon } from "@src/api/webtoon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Chapter } from "@src/types/webtoon";
import { Box, Container } from "@mui/material";
import Header from "@src/components/Header";
import { ChartContainer, LineChart } from "@mui/x-charts";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

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
        width={1000}
        height={300}
        series={[
          { data: [...data.map((chapter) => chapter.total_star)], label: "총 별점", yAxisKey: "leftAxisId" },
          { data: [...data.map((chapter) => chapter.average_star)], label: "평균 별점", yAxisKey: "rightAxisId" },
        ]}
        sx={{
          ".MuiMarkElement-root": {
            scale: "0",
          },
        }}
        xAxis={[{ scaleType: "point", data: [...data.map((chapter) => chapter.id)] }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
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
