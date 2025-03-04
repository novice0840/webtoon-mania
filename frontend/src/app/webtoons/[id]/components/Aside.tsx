"use client";

import React from "react";
import WebtoonMini from "./WebtoonMini";
import { useInfiniteWebtoons } from "@/app/hooks/useInfiniteWebtoons";

interface AsideProps {
  writer?: string;
  illustrator?: string;
}

const Aside = ({ writer, illustrator }: AsideProps) => {
  const { data: webtoonsByIllustrator } = useInfiniteWebtoons({
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
          {webtoonsByWriter.map(({ title, thumbnailURL, genre, id }) => (
            <li key={id}>
              <WebtoonMini
                title={title}
                thumbnailURL={thumbnailURL}
                genre={genre}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>이 그림 작가의 또 다른 작품 </div>
        <ul className="flex flex-col gap-2">
          {webtoonsByIllustrator.map(({ title, thumbnailURL, genre, id }) => (
            <li key={id}>
              <WebtoonMini
                title={title}
                thumbnailURL={thumbnailURL}
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
