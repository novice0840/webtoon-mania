import React from "react";
import Image from "next/image";

interface WebtoonDetailProps {
  webtoon: {
    id: string;
    title: string;
    writer: string;
    illustrator: string;
    genre: string;
    synopsis: string;
    thumbnailURL: string;
    platforms: string[];
  };
}

const WebtoonDetail = ({
  webtoon: {
    id,
    title,
    writer,
    illustrator,
    genre,
    synopsis,
    thumbnailURL,
    platforms,
  },
}: WebtoonDetailProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative h-[200px] w-full">
        <Image
          src={thumbnailURL}
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
