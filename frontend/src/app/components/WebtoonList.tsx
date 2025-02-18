"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";

const WebtoonList = ({ platform }: { platform: string }) => {
  useEffect(() => {
    console.log(`WebtoonList platform: ${platform}`);
  });
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 100 }).map((_, index) => (
        <li key={index}>
          <Link href="/webtoons/1">
            <Image src="/logo.svg" alt="webtoon" width={150} height={150} />
            <div className="text-sm">웹툰 제목</div>
            <div className="text-xs">작가명</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default WebtoonList;
