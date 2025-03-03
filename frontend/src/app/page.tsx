import Fetch from "@/app/utils/fetch";
import WebtoonListContainer from "@/app/components/WebtoonListContainer";

export default async function Home() {
  const platforms: string[] = await Fetch.get(`platforms`);
  const genres: string[] = await Fetch.get(`genres`);

  return (
    <div>
      <WebtoonListContainer platforms={platforms} genres={genres} />
    </div>
  );
}
