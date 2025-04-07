import { useInfiniteQuery } from "@tanstack/react-query";
import Fetch from "@/app/utils/fetch";
import { CommonResponseDTO } from "@/app/types/api";

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
  thumbnailURL?: string;
};

type WebtoonsResponse = {
  totalPage: number;
  totalCount: number;
  curPage: number;
  webtoons: Webtoon[];
};

export const useGetWebtoons = ({
  platform,
  illustrator,
  writer,
  genre,
}: UseGetWebtoonsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["useGetWebtoons", platform, illustrator, writer, genre],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await Fetch.get<CommonResponseDTO<WebtoonsResponse>>(
        "webtoons",
        {
          platform: platform === "all" ? undefined : platform,
          genre: genre === "all" ? undefined : genre,
          illustrator,
          writer,
          page: pageParam,
        },
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.curPage < lastPage.totalPage
        ? lastPage.curPage + 1
        : undefined;
    },
  });
};
