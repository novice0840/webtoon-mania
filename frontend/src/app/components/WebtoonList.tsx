"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetGenres } from "@/app/utils/api";
import { useInfiniteWebtoons } from "@/app/hooks/useInfiniteWebtoons";

const WebtoonList = ({ platform }: { platform: string }) => {
  const { data: genres } = useGetGenres();
  const { data, isFetchingNextPage } = useInfiniteWebtoons();

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {data?.pages.map((page) =>
        page.data.map(({ id, title, writer, illustrator, thumbnailURL }) => (
          <li key={id} className="border">
            <Link href={`/webtoons/${id}`}>
              {thumbnailURL && (
                <Image
                  src={thumbnailURL}
                  alt={`${title} 썸네일`}
                  width={150}
                  height={150}
                />
              )}
              <div className="text-sm">{title}</div>
              <div className="text-xs">글 작가: {writer}</div>
              <div className="text-xs">그림 작가: {illustrator}</div>
            </Link>
          </li>
        )),
      )}
      {isFetchingNextPage && <p>Loading more...</p>}
    </ul>
  );
};

export default WebtoonList;
