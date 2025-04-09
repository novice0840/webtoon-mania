"use client";

import React from "react";
import WebtoonMini from "./WebtoonMini";
import { useInfiniteWebtoons } from "@/hooks/useInfiniteWebtoons";
import { NO_THUMBNAIL_URL } from "@/constant/webtoon";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface AsideProps {
  writer?: string;
  illustrator?: string;
}

const Aside = ({ writer, illustrator }: AsideProps) => {
  const params = useParams();
  const { id } = params;
  const { data: webtoonsByIllustrator, isLoading: isIllustratorLoading } =
    useInfiniteWebtoons({
      illustrator,
    });

  const { data: webtoonsByWriter } = useInfiniteWebtoons({
    writer,
  });

  return (
    <aside className="hidden w-64 md:block">
      <div className="mb-16">
        <div>이 글 작가의 또 다른 작품 </div>
        <ul className="flex flex-col gap-2">
          {isIllustratorLoading &&
            Array.from({ length: 20 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-[100px] w-[100px]" />
              </li>
            ))}
          {webtoonsByWriter
            .filter(({ id: webtoonId }) => webtoonId !== id)
            .map(({ title, thumbnailURL, genre, id }) => (
              <li key={id}>
                <WebtoonMini
                  title={title}
                  thumbnailURL={thumbnailURL ? thumbnailURL : NO_THUMBNAIL_URL}
                  genre={genre}
                />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div>이 그림 작가의 또 다른 작품 </div>
        <ul className="flex flex-col gap-2">
          {webtoonsByIllustrator
            .filter(({ id: webtoonId }) => webtoonId !== id)
            .map(({ title, thumbnailURL, genre, id }) => (
              <li key={id}>
                <WebtoonMini
                  title={title}
                  thumbnailURL={thumbnailURL ? thumbnailURL : NO_THUMBNAIL_URL}
                  genre={genre}
                />
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
