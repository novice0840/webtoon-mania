"use client";

import WebtoonList from "./components/WebtoonList";
import { useGetPlatforms } from "@/app/hooks/useGetPlatforms";
import { useGetGenres } from "./hooks/useGetGenres";

export default function Home() {
  const { data: platforms } = useGetPlatforms();
  const { data: genres } = useGetGenres();

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-[80%]">
        <h2 className="text-2xl">플랫폼</h2>

        <ul className="flex flex-wrap gap-2">
          <li key={"전체"}>
            <div className="rounded border bg-gray-200 p-2 text-gray-600">
              {"전체"}
            </div>
          </li>
          {platforms?.map((platform) => (
            <li key={platform}>
              <div className="rounded border bg-gray-200 p-2 text-gray-600">
                {platform}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[80%]">
        <h2 className="text-2xl">장르</h2>
        <ul className="flex flex-wrap gap-2">
          <li key={"전체"}>
            <div className="rounded border bg-gray-200 p-2 text-gray-600">
              #{"전체"}
            </div>
          </li>
          {genres?.map((genre) => (
            <li key={genre}>
              <div className="rounded border bg-gray-200 p-2 text-gray-600">
                #{genre}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <WebtoonList platform="all" />
    </div>
  );
}
