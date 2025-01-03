import React from "react";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <ul>
      <li>
        <CommentItem />
      </li>
      <li>
        <CommentItem />
      </li>
      <li>
        <CommentItem />
      </li>
      <li>
        <CommentItem />
      </li>
    </ul>
  );
};

export default CommentList;
