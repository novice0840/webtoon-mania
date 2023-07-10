import { useState } from "react";
import { WebtoonWrapper, WebtoonInfo, WebtoonContents } from "./style";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getWebtoon, getBestComments } from "api/cralwer";
import { webtoonContent, bestComment } from "types";
import BestComments from "components/BestCommnets";

const webtoon = () => {
  const { titleId } = useParams();
  const [bestComments, setBestcomments] = useState<{ [key: number]: bestComment[] }>({});
  const [bestCommentsToggle, setBestCommentsToggle] = useState<{ [key: number]: boolean }>({});
  const { status, data, error } = useQuery("getWebtoon", () => getWebtoon(titleId ?? ""));
  if (!titleId) {
    return <div>잘못된 URL 입니다</div>;
  }
  if (status === "loading") {
    return <div>로딩중</div>;
  }
  const handleButton = async (chapter: number) => {
    // 베스트 댓글을 닫는 경우에는 다시 API 콜을 할 필요가 없음
    if (!bestCommentsToggle[chapter]) {
      const data = await getBestComments(titleId, chapter);
      setBestcomments((current) => {
        let newCondition = { ...current };
        newCondition[chapter] = data;
        return newCondition;
      });
    }

    setBestCommentsToggle((current) => {
      let newCondition = { ...current };
      if (current[chapter]) {
        newCondition[chapter] = false;
      } else {
        newCondition[chapter] = true;
      }
      return newCondition;
    });
  };

  return (
    <WebtoonWrapper>
      <WebtoonInfo>
        <img className="thumb" src={data.thumb} alt="썸네일" />
        <section>
          <div className="title">{data.title}</div>
          <div className="author">{data.author}</div>
          <div className="description">{data.description}</div>
        </section>
      </WebtoonInfo>
      <WebtoonContents>
        {data.contents.map((content: webtoonContent, i: number) => (
          <div key={i}>
            <div className="content">
              <img className="content-thumb" src={content.thumb} alt="" />
              <div>{content.title}</div>
              {bestCommentsToggle[content.chapter] ? (
                <button onClick={() => handleButton(content.chapter)}>베스트 댓글 닫기</button>
              ) : (
                <button onClick={() => handleButton(content.chapter)}>베스트 댓글 탐색</button>
              )}
            </div>
            {bestComments[content.chapter] && bestCommentsToggle[content.chapter] && (
              <BestComments bestComments={bestComments} chapter={content.chapter} />
            )}
          </div>
        ))}
      </WebtoonContents>
    </WebtoonWrapper>
  );
};

export default webtoon;
