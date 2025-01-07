import React from "react";
import Image from "next/image";

const WebtoonMini = () => {
  return (
    <div className="flex items-center gap-1">
      <Image src="/logo.svg" alt="webtoon" width={60} height={60} />
      <div>
        <div className="text-xs">웹툰 제목</div>
        <div className="text-xs">작가명</div>
      </div>
    </div>
  );
};

export default WebtoonMini;
