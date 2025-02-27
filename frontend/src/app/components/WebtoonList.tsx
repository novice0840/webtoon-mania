"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { useGetGenres, useGetWebtoons } from "@/app/utils/api";

const WebtoonList = ({ platform }: { platform: string }) => {
  useEffect(() => {
    console.log(`WebtoonList platform: ${process.env.NEXT_PUBLIC_API_URL}`);
  });

  const { data: genres } = useGetGenres();
  const { data: webtoons } = useGetWebtoons();

  console.log(webtoons);
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {webtoons?.data.map(
        ({ id, title, writer, illustrator, thumbnailURL }) => (
          <li key={id}>
            <Link href={`/webtoons/${id}`}>
              <Image
                src={thumbnailURL}
                alt={`${title} 썸네일`}
                width={150}
                height={150}
              />
              <div className="text-sm">{title}</div>
              <div className="text-xs">글 작가: {writer}</div>
              <div className="text-xs">그림 작가: {illustrator}</div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default WebtoonList;
