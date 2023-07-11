import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { WebtoonInfo } from "@src/types/webtoon";
import { getAllWebtoon } from "@src/api/webtoon";

const Main = () => {
  const { isLoading, isError, data, error }: UseQueryResult<WebtoonInfo[], unknown> = useQuery({
    queryKey: ["getAllWebtoon"],
    queryFn: getAllWebtoon,
  });

  return (
    <div>
      <h1>
        <Link to="/">네이버 웹툰 분석기</Link>
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.map((webtoon: WebtoonInfo) => (
          <Link key={webtoon.id} to={"/webtoon/" + webtoon.id.toString()}>
            <div key={webtoon.id}>
              <div>{webtoon.id}</div>
              <div>{webtoon.title}</div>
              <div>{webtoon.day}</div>
              <img src={webtoon.thumbnail} width={160} height={207} alt="" />
              <div>{webtoon.interest_count}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
