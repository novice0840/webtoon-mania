import Fetch from "@/utils/fetch";
import type { Webtoon } from "@/types/webtoon";
import type { CommonResponseDTO } from "@/types/api";

export const getWebtoon = async (id: string): Promise<Webtoon> => {
  const response = await Fetch.get<CommonResponseDTO<{ webtoon: Webtoon }>>(
    `webtoons/webtoon/${id}`,
  );
  return response.data.webtoon;
};
