import { useGetWebtoons } from "@/app/utils/api";
import { useEffect } from "react";

export const useInfiniteWebtoons = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetWebtoons();

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

  return { data, isFetchingNextPage };
};
