import React, { useState, useEffect } from "react";
import { WebtoonWrapper, WebtoonInfo, WebtoonContents } from "./style";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getWebtoon, getBestComments } from "api/cralwer";

type WebtoonContent = {
  chapter: number;
  thumb: string;
  title: string;
};

type bestComment = {
  name: string;
  text: string;
  like: string;
  dislike: string;
  date: string;
};

const webtoon = () => {
  const params = useParams();
  const titleId = params.titleId;
  const [bestComments, setBestcomments] = useState<{ [key: number]: bestComment[] }>({});
  const { status, data, error } = useQuery("getWebtoon", () => getWebtoon(titleId ?? ""));
  if (!titleId) {
    return <div>잘못된 URL 입니다</div>;
  }
  if (status == "loading") {
    return <div>로딩중</div>;
  }
  const handleButton = async (chapter: number) => {
    const response = await getBestComments(titleId, chapter);
    setBestcomments((current) => {
      let newCondition = { ...current };
      newCondition[chapter] = response;
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
        {data.contents.map((content: WebtoonContent, i: number) => (
          <div key={i}>
            <div className="content">
              <img className="content-thumb" src={content.thumb} alt="" />
              <div>{content.title}</div>
              <button onClick={() => handleButton(content.chapter)}>베스트 댓글 탐색</button>
            </div>
            {bestComments[content.chapter] ? (
              <div className="best-comments">
                {bestComments[content.chapter].map((bestComment, i) => (
                  <div key={i} className="best-comment">
                    <div className="bestcomment-name">{bestComment.name}</div>
                    <div className="bestcomment-text">{bestComment.text}</div>
                    <span className="bestcomment-like">좋아요 {bestComment.like}</span>
                    <span className="bestcomment-dislike">싫어요 {bestComment.dislike}</span>
                    <span className="bestcomment-date">{bestComment.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </WebtoonContents>
    </WebtoonWrapper>
  );
};

export default webtoon;
