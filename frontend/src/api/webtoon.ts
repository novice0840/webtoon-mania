import { Webtoon } from "@src/types/webtoon";
import axiosInstace from "./init";

export const getAllWebtoon = () => axiosInstace.get<Webtoon[]>("/webtoon/allwebtoon").then((response) => response.data);

export const getOneWebtoon = (id: string) =>
  axiosInstace.get<Webtoon[]>(`/webtoon/onewebtoon/${id}`).then((response) => response.data);
