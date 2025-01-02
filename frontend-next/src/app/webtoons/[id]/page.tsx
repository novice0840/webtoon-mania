export default async function WebtoonDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Webtoon Detail Page</h1>
      <p>Webtoon ID: {id}</p>
    </div>
  );
}
