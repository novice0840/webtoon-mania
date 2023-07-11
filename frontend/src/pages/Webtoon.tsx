import { getOneWebtoon } from "@src/api/webtoon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Chapter } from "@src/types/webtoon";

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
    <div>
      <h1>
        <Link to="/">네이버 웹툰 분석기</Link>
      </h1>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.map((chapter: Chapter) => (
            <Link key={chapter.id} to={"/chapter/" + chapter.id.toString()}>
              <div key={chapter.id}>
                <div>{chapter.name}</div>
                <div>{chapter.upload_data}</div>
                <div>{chapter.like_count}</div>
                <div>{chapter.average_star}</div>
                <div>{chapter.total_star}</div>
                <img src={chapter.thumbnail} width={106} height={62} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Webtoon;
