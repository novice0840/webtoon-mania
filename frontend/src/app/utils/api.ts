import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Fetch from "./fetch";

export const useGetGenres = () => {
  return useQuery<string[]>({
    queryKey: ["useGetGenres"],
    queryFn: () => Fetch.get(`genres`),
  });
};
