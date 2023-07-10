import React from "react";
import { BestCommentsWrapper } from "./style";
import { bestComment } from "types";

type Proptypes = {
  bestComments: { [key: number]: bestComment[] };
  chapter: number;
};

const BestComments = ({ bestComments, chapter }: Proptypes) => {
  return (
    <BestCommentsWrapper>
      {bestComments[chapter].map((bestComment, i) => (
        <div key={i} className="best-comment">
          <div className="bestcomment-name">{bestComment.name}</div>
          <div className="bestcomment-text">{bestComment.text}</div>
          <span className="bestcomment-like">좋아요 {bestComment.like}</span>
          <span className="bestcomment-dislike">싫어요 {bestComment.dislike}</span>
          <span className="bestcomment-date">{bestComment.date}</span>
        </div>
      ))}
    </BestCommentsWrapper>
  );
};

export default BestComments;
