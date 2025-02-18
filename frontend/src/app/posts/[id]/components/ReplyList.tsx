import React from "react";
import ReplyItem from "./ReplyItem";

const ReplyList = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="mb-4">
          <ReplyItem key={index} />
        </li>
      ))}
    </ul>
  );
};

export default ReplyList;
