import WebtoonDetail from "./components/WebtoonDetail";
import Aside from "./components/Aside";
import WebtoonPostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { getWebtoon } from "./utils/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Webtoon } from "@/types/webtoon";

interface WebtoonPageProps {
  params: { id: string };
}

export default async function WebtoonPage({ params }: WebtoonPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getWebtoon", id],
    queryFn: () => getWebtoon(id),
  });
  const webtoon = await queryClient.getQueryData<Webtoon>(["webtoon", id]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto flex max-w-4xl justify-between gap-4">
        <main className="mx-auto flex max-w-xl flex-1 flex-col gap-8">
          <WebtoonDetail id={id} />
          <PostForm />
          <WebtoonPostList />
        </main>
        {webtoon && (
          <Aside writer={webtoon.writer} illustrator={webtoon.illustrator} />
        )}
      </div>
    </HydrationBoundary>
  );
}
