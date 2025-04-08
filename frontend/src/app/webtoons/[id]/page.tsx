import WebtoonDetail from "./components/WebtoonDetail";
import Aside from "./components/Aside";
import WebtoonPostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Fetch from "@/utils/fetch";
import type { Webtoon } from "@/types/webtoon";
import type { CommonResponseDTO } from "@/types/api";

export default async function WebtoonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const response = await Fetch.get<CommonResponseDTO<{ webtoon: Webtoon }>>(
    `webtoons/webtoon/${id}`,
  );
  const webtoon = response.data.webtoon;

  return (
    <div className="mx-auto flex max-w-4xl justify-between gap-4">
      <main className="mx-auto flex max-w-xl flex-1 flex-col gap-8">
        <WebtoonDetail webtoon={webtoon} />
        <PostForm />
        <WebtoonPostList />
      </main>
      <Aside writer={webtoon.writer} illustrator={webtoon.illustrator} />
    </div>
  );
}
