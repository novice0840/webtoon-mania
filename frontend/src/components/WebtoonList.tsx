"use client";

import Image from "next/image";
import Link from "next/link";
import { useInfiniteWebtoons } from "@/hooks/useInfiniteWebtoons";
import { NO_THUMBNAIL_URL } from "@/constant/webtoon";
import { Skeleton } from "@/components/ui/skeleton";

interface WebtoonListProps {
  platform: string;
  genre: string;
}

const WebtoonList = ({ platform, genre }: WebtoonListProps) => {
  const { data, isFetchingNextPage, totalCount, isLoading } =
    useInfiniteWebtoons({
      platform,
      genre,
    });

  return (
    <div>
      {!isLoading && <div>총 갯수: {totalCount}</div>}

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-[200px] w-[150px]" />
              </li>
            ))
          : data?.map(({ id, title, writer, illustrator, thumbnailURL }) => (
              <li key={id} className="border p-2">
                <Link
                  className="flex h-full flex-col justify-between"
                  href={`/webtoons/${id}`}
                >
                  <Image
                    src={thumbnailURL ? thumbnailURL : NO_THUMBNAIL_URL}
                    alt={`${title} 썸네일`}
                    width={150}
                    height={150}
                    className="h-auto w-auto object-contain"
                  />
                  <div>
                    <div className="text-sm font-bold">{title}</div>
                    <div className="text-xs">글 작가: {writer}</div>
                    <div className="text-xs">그림 작가: {illustrator}</div>
                  </div>
                </Link>
              </li>
            ))}
      </ul>

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default WebtoonList;
