"use client";

import React from "react";
import Image from "next/image";
import { NO_THUMBNAIL_URL } from "@/constant/webtoon";
import { Webtoon } from "@/types/webtoon";
import { useQuery } from "@tanstack/react-query";
import { getWebtoon } from "../utils/api";
import { Skeleton } from "@/components/ui/skeleton";

interface WebtoonDetailProps {
  id: string;
}

const WebtoonDetail = ({ id }: WebtoonDetailProps) => {
  const { data } = useQuery({
    queryKey: ["getWebtoon", id],
    queryFn: () => getWebtoon(id),
  });

  if (!data) {
    return <Skeleton />;
  }

  const {
    title,
    thumbnailURL,
    illustrator,
    writer,
    platforms,
    genre,
    synopsis,
  } = data;

  return (
    <div className="flex gap-2">
      <div className="relative w-1/2">
        <Image
          src={thumbnailURL ?? NO_THUMBNAIL_URL}
          alt="webtoon"
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1>{title}</h1>
        <div className="flex flex-col text-sm">
          <span>그림 작가: {illustrator}</span>
          <span>글 작가: {writer}</span>
        </div>
        <div className="text-sm">{platforms}</div>
        <div className="flex gap-2">
          <span className="text-xs">{genre}</span>
        </div>
        <p className="text-xs">{synopsis}</p>
      </div>
    </div>
  );
};

export default WebtoonDetail;
