import { useGetWebtoons } from "@/hooks/useGetWebtoons";
import { useEffect } from "react";

interface UseInfiniteWebtoonsPrarams {
  platform?: string;
  illustrator?: string;
  writer?: string;
  genre?: string;
}

export const useInfiniteWebtoons = ({
  platform,
  illustrator,
  writer,
  genre,
}: UseInfiniteWebtoonsPrarams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetWebtoons({
      platform,
      illustrator,
      writer,
      genre,
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  const flattenedData = data?.pages.flatMap((page) => page.webtoons) || [];

  return {
    data: flattenedData,
    isFetchingNextPage,
    totalCount: data?.pages[0].totalCount,
    isLoading,
  };
};
