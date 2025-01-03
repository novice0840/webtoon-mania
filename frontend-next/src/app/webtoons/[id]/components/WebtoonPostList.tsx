"use client";

import React from "react";
import WebtoonPostItem from "./WebtoonPostItem";

const WebtoonPostList = () => {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <WebtoonPostItem />
        </li>
      ))}
    </ul>
  );
};

export default WebtoonPostList;
