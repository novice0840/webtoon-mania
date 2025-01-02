import WebtoonDetail from "./components/WebtoonDetail";
import Aside from "./components/Aside";

export default async function WebtoonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="mx-auto flex max-w-4xl justify-between gap-4">
      <WebtoonDetail />
      <Aside />
    </div>
  );
}
