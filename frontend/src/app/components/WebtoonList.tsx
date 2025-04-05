"use client";

import Image from "next/image";
import Link from "next/link";
import { useInfiniteWebtoons } from "@/app/hooks/useInfiniteWebtoons";
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
              <li key={i} className="">
                <Skeleton className="h-[200px] w-[150px]" />
              </li>
            ))
          : data?.map(({ id, title, writer, illustrator, thumbnailURL }) => (
              <li key={id} className="border p-2">
                <Link href={`/webtoons/${id}`}>
                  {thumbnailURL && (
                    <Image
                      src={thumbnailURL}
                      alt={`${title} 썸네일`}
                      width={150}
                      height={150}
                      className="h-auto w-auto object-contain"
                    />
                  )}
                  <div className="text-sm">{title}</div>
                  <div className="text-xs">글 작가: {writer}</div>
                  <div className="text-xs">그림 작가: {illustrator}</div>
                </Link>
              </li>
            ))}
      </ul>

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default WebtoonList;
