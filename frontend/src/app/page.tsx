"use client";

import WebtoonList from "./components/WebtoonList";
import { useGetPlatforms } from "@/app/hooks/useGetPlatforms";
import { useGetGenres } from "./hooks/useGetGenres";
import { useState } from "react";

export default function Home() {
  const { data: platforms } = useGetPlatforms();
  const { data: genres } = useGetGenres();
  const [curPlatform, setCurPlatform] = useState("all");
  const [curGenre, setCurGenre] = useState("all");

  const handleClickPlatform = (platform: string) => {
    setCurPlatform(platform);
  };

  const handleClickGenre = (genre: string) => {
    setCurGenre(genre);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-[80%]">
        <h2 className="text-2xl">플랫폼</h2>
        <ul className="flex flex-wrap gap-2">
          <li key="all">
            <button
              className={`rounded border p-2 ${curPlatform === "all" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
              onClick={() => handleClickPlatform("all")}
            >
              전체
            </button>
          </li>
          {platforms?.map((platform) => (
            <li key={platform}>
              <button
                className={`rounded border p-2 ${curPlatform === platform ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
                onClick={() => handleClickPlatform(platform)}
              >
                {platform}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[80%]">
        <h2 className="text-2xl">장르</h2>
        <ul className="flex flex-wrap gap-2">
          <li key="all">
            <button
              className={`rounded border p-2 ${curGenre === "all" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
              onClick={() => handleClickGenre("all")}
            >
              #전체
            </button>
          </li>
          {genres?.map((genre) => (
            <li key={genre}>
              <button
                className={`rounded border p-2 ${curGenre === genre ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
                onClick={() => handleClickGenre(genre)}
              >
                #{genre}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <WebtoonList platform={curPlatform} genre={curGenre} />
    </div>
  );
}
