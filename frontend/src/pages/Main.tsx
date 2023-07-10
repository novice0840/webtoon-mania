import { useQuery, useQueryClient, QueryFunction, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface WebtoonInfo {
  id: number;
  title: string;
  day: "월요웹툰" | "화요웹툰" | "수요웹툰" | "목요웹툰" | "금요웹툰" | "토요웹툰" | "일요웹툰";
  thumbnail: string;
  interest_count: number;
}

const Main = () => {
  // Access the client
  const queryClient = useQueryClient();
  const getAllWebtoon = () =>
    axios.get<WebtoonInfo[]>("http://localhost:3001/webtoon/allwebtoon").then((response) => response.data);
  // Queries
  const { isLoading, isError, data, error }: UseQueryResult<WebtoonInfo[], unknown> = useQuery({
    queryKey: ["getAllWebtoon"],
    queryFn: getAllWebtoon,
  });
  return (
    <div>
      <div>hello, world</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.map((webtoon: WebtoonInfo) => (
          <div key={webtoon.id}>
            <div>{webtoon.id}</div>
            <div>{webtoon.title}</div>
            <div>{webtoon.day}</div>
            <img src={webtoon.thumbnail} width={160} height={207} alt="" />
            <div>{webtoon.interest_count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
