import { useQuery } from "@tanstack/react-query";
import Fetch from "@/app/utils/fetch";

export const useGetGenres = () => {
  return useQuery<string[]>({
    queryKey: ["useGetGenres"],
    queryFn: () => Fetch.get(`genres`),
  });
};
