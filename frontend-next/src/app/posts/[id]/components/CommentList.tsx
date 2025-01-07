import React from "react";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li className="mt-4" key={index}>
          <CommentItem />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
