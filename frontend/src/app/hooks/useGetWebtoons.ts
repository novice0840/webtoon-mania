import { useInfiniteQuery } from "@tanstack/react-query";
import Fetch from "@/app/utils/fetch";

type UseGetWebtoonsParams = {
  platform?: string;
  illustrator?: string;
  writer?: string;
  genre?: string;
};

type Webtoon = {
  id: string;
  title: string;
  writer: string;
  illustrator: string;
  genre: string;
  synopsis: string;
  thumbnailURL: string;
};

type WebtoonsResponse = {
  totalPage: number;
  totalCount: number;
  curPage: number;
  data: Webtoon[];
};

export const useGetWebtoons = ({
  platform,
  illustrator,
  writer,
  genre,
}: UseGetWebtoonsParams = {}) => {
  return useInfiniteQuery<WebtoonsResponse>({
    queryKey: ["useGetWebtoons", platform, illustrator, writer, genre],
    queryFn: async ({ pageParam = 1 }) =>
      Fetch.get("webtoons", {
        platform: platform === "all" ? undefined : platform,
        genre: genre === "all" ? undefined : genre,
        illustrator,
        writer,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.curPage < lastPage.totalPage
        ? lastPage.curPage + 1
        : undefined;
    },
  });
};
