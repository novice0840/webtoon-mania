"use client";

import Image from "next/image";
import Link from "next/link";
import { useInfiniteWebtoons } from "@/app/hooks/useInfiniteWebtoons";

interface WebtoonListProps {
  platform: string;
  genre: string;
}

const WebtoonList = ({ platform, genre }: WebtoonListProps) => {
  const { data, isFetchingNextPage } = useInfiniteWebtoons({ platform, genre });

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
      {data?.map(({ id, title, writer, illustrator, thumbnailURL }) => (
        <li key={id} className="border">
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
      {isFetchingNextPage && <p>Loading more...</p>}
    </ul>
  );
};

export default WebtoonList;
