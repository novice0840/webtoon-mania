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
  const getAllWebtoon = () => {
    return axios.get("http://localhost:3001/webtoon/allwebtoon");
  };
  // Queries
  const { isLoading, isError, data, error }: UseQueryResult<WebtoonInfo[], unknown> = useQuery({
    queryKey: ["todos"],
    queryFn: getAllWebtoon,
  });
  console.log(data);
  return (
    <div>
      <div>hello, world</div>
      <ul>
        {data?.map((webtoon: WebtoonInfo) => (
          <li key={webtoon.id}>
            <div>{webtoon.id}</div>
            <div>{webtoon.title}</div>
            <div>{webtoon.day}</div>
            <div>{webtoon.thumbnail}</div>
            <div>{webtoon.interest_count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
