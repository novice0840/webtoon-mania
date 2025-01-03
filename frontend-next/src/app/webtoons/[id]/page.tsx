import WebtoonDetail from "./components/WebtoonDetail";
import Aside from "./components/Aside";
import WebtoonPostList from "./components/WebtoonPostList";
import WebtoonPostForm from "./components/WebtoonPostForm";

export default async function WebtoonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="mx-auto flex max-w-4xl justify-between gap-4">
      <main className="flex max-w-xl flex-1 flex-col gap-8">
        <WebtoonDetail />
        <WebtoonPostForm />
        <WebtoonPostList />
      </main>
      <Aside />
    </div>
  );
}
