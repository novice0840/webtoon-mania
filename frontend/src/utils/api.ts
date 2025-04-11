import { CommonResponseDTO } from "@/types/api";
import Fetch from "@/utils/fetch";

export const getGenres = async (): Promise<string[]> => {
  const response =
    await Fetch.get<CommonResponseDTO<{ genres: string[] }>>(`genres`);
  return response.data.genres;
};

export const getPlatforms = async (): Promise<string[]> => {
  const response =
    await Fetch.get<CommonResponseDTO<{ platforms: string[] }>>(`platforms`);
  return response.data.platforms;
};
