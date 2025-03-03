import { useInfiniteQuery } from "@tanstack/react-query";
import Fetch from "@/app/utils/fetch";

type UseGetWebtoonsParams = {
  platform?: string;
  illustrator?: string;
  writer?: string;
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
  curPage: number;
  data: Webtoon[];
};

export const useGetWebtoons = ({
  platform,
  illustrator,
  writer,
}: UseGetWebtoonsParams = {}) => {
  return useInfiniteQuery<WebtoonsResponse>({
    queryKey: ["useGetWebtoons", platform, illustrator, writer],
    queryFn: async ({ pageParam = 1 }) =>
      Fetch.get("webtoons", {
        platform: platform === "all" ? undefined : platform,
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
