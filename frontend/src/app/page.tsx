import WebtoonListContainer from "@/components/WebtoonListContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getGenres, getPlatforms } from "./utils/api";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getGenres"],
    queryFn: () => getPlatforms(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["getPlatforms"],
    queryFn: () => getGenres(),
  });

  const platforms =
    (await queryClient.getQueryData<string[]>(["getPlatforms"])) || [];
  const genres =
    (await queryClient.getQueryData<string[]>(["getGenres"])) || [];

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WebtoonListContainer platforms={platforms} genres={genres} />
    </HydrationBoundary>
  );
}
