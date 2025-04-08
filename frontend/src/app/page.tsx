import Fetch from "@/utils/fetch";
import WebtoonListContainer from "@/components/WebtoonListContainer";
import { CommonResponseDTO } from "../types/api";

export default async function Home() {
  const platforms: string[] = (
    await Fetch.get<CommonResponseDTO<{ platforms: string[] }>>(`platforms`)
  ).data.platforms;
  const genres: string[] = (
    await Fetch.get<CommonResponseDTO<{ genres: string[] }>>(`genres`)
  ).data.genres;

  return (
    <div>
      <WebtoonListContainer platforms={platforms} genres={genres} />
    </div>
  );
}
