import React from "react";
import Image from "next/image";

const WebtoonDetail = () => {
  return (
    <div className="flex gap-2">
      <Image src="/logo.svg" alt="webtoon" width={150} height={150} />
      <div className="flex flex-col gap-1">
        <h1>웹툰 제목</h1>
        <div className="text-sm">작가명</div>
        <div className="text-sm">네이버</div>
        <div className="flex gap-2">
          <span className="text-xs">장르1</span>
          <span className="text-xs">장르2</span>
          <span className="text-xs">장르3</span>
        </div>
        <p className="text-xs">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio
          sapiente laborum quas nemo dolorum, nam, nobis atque tempora cum
          similique ratione vel voluptate ipsa vero! Modi tempora nobis
          recusandae?
        </p>
      </div>
    </div>
  );
};

export default WebtoonDetail;
