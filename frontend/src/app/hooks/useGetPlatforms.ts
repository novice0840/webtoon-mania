import { useQuery } from "@tanstack/react-query";
import Fetch from "@/app/utils/fetch";

export const useGetPlatforms = () => {
  return useQuery<string[]>({
    queryKey: ["useGetPlatform"],
    queryFn: () => Fetch.get(`platforms`),
  });
};
