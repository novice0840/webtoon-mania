"use client";

import React from "react";
import PostItem from "@/components/PostItem";

const PostList = () => {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="mb-4">
          <PostItem />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
