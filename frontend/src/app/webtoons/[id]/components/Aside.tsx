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
      <div>이 작가의 또 다른 작품 </div>
      <ul>
        {webtoonsByIllustrator.map(({ title, thumbnailURL, genre }) => (
          <li>
            <WebtoonMini
              title={title}
              thumbnailURL={thumbnailURL}
              genre={genre}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
