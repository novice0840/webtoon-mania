import { useGetWebtoons } from "@/app/hooks/useGetWebtoons";
import { useEffect } from "react";

interface UseInfiniteWebtoonsPrarams {
  platform?: string;
  illustrator?: string;
  writer?: string;
}

export const useInfiniteWebtoons = ({
  platform,
  illustrator,
  writer,
}: UseInfiniteWebtoonsPrarams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetWebtoons({
      platform,
      illustrator,
      writer,
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  const flattenedData = data?.pages.flatMap((page) => page.data) || [];

  return { data: flattenedData, isFetchingNextPage };
};
