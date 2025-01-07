import { WebtoonBase } from "@src/types/webtoon";
import axiosInstace from "./init";

export const getAllWebtoon = () =>
  axiosInstace.get<WebtoonBase[]>("/webtoon/allwebtoon").then((response) => response.data);

export const getOneWebtoon = (id: string) =>
  axiosInstace.get<WebtoonBase[]>(`/webtoon/onewebtoon/${id}`).then((response) => response.data);
