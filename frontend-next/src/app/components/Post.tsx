"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const Post = ({
  posts,
}: {
  posts: { userId: number; id: number; title: string; body: string }[];
}) => {
  const { data } = useQuery<
    { userId: number; id: number; title: string; body: string }[]
  >({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    },
    initialData: posts,
  });
  return (
    <div>
      {data?.map(({ userId, id, title, body }) => <div key={id}>{title}</div>)}
    </div>
  );
};

export default Post;
