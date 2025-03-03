"use client";

import React, { useState } from "react";
import WebtoonList from "@/app/components/WebtoonList";
import PlatformSelector from "@/app/components/PlatformSelector";
import GenreSelector from "@/app/components/GenreSelector";

interface WebtoonListContainerProps {
  platforms: string[];
  genres: string[];
}

const WebtoonListContainer = ({
  platforms,
  genres,
}: WebtoonListContainerProps) => {
  const [curPlatform, setCurPlatform] = useState("all");
  const [curGenre, setCurGenre] = useState("all");

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <PlatformSelector
        platforms={platforms}
        changePlatform={(platform) => setCurPlatform(platform)}
        curPlatform={curPlatform}
      />
      <GenreSelector
        genres={genres}
        curGenre={curGenre}
        changeGenre={(genre) => setCurGenre(genre)}
      />
      <WebtoonList platform={curPlatform} genre={curGenre} />
    </div>
  );
};

export default WebtoonListContainer;
