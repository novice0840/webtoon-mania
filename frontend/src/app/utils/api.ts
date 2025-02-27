import { useQuery } from "@tanstack/react-query";
import Fetch from "./fetch";

type UseGetWebtoonsParams = {
  platform?: string;
  illustrator?: string;
  writer?: string;
  page?: number;
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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useGetGenres = () => {
  return useQuery<string[]>({
    queryKey: ["useGetGenres"],
    queryFn: () => Fetch.get(`${BASE_URL}/genres`),
  });
};

export const useGetWebtoons = ({
  platform,
  illustrator,
  writer,
  page,
}: UseGetWebtoonsParams = {}) => {
  return useQuery<WebtoonsResponse>({
    queryKey: ["useGetWebtoon", platform, illustrator, writer, page],
    queryFn: async () =>
      Fetch.get(`${BASE_URL}/webtoons`, {
        platform,
        illustrator,
        writer,
        page,
      }),
  });
};
