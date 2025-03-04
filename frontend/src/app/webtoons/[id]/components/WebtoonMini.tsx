import React from "react";
import Image from "next/image";

interface WebtoonMiniProps {
  title: string;
  thumbnailURL: string;
  genre: string;
}

const WebtoonMini = ({ title, thumbnailURL, genre }: WebtoonMiniProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={thumbnailURL} alt="webtoon" width={60} height={60} />
      <div>
        <div className="text-xs">{title}</div>
        <div className="text-xs">{genre}</div>
      </div>
    </div>
  );
};

export default WebtoonMini;
