import axios from "axios";
import { WebtoonInfo } from "@src/types/webtoon";
import axiosInstace from "./init";

export const getAllWebtoon = () =>
  axiosInstace.get<WebtoonInfo[]>("/webtoon/allwebtoon").then((response) => response.data);

export const getOneWebtoon = (id: number) =>
  axiosInstace.get<WebtoonInfo[]>(`/webtoon/onewebtoon/${id}`).then((response) => response.data);
