"use client";

interface GenreSelectorProps {
  genres: string[];
  curGenre: string;
  changeGenre: (genre: string) => void;
}

const GenreSelector = ({
  genres,
  curGenre,
  changeGenre,
}: GenreSelectorProps) => {
  return (
    <div className="w-[80%]">
      <h2 className="text-2xl">장르</h2>
      <ul className="flex flex-wrap gap-2">
        <li key="all">
          <button
            className={`rounded border p-2 ${curGenre === "all" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
            onClick={() => changeGenre("all")}
          >
            #전체
          </button>
        </li>
        {genres?.map((genre) => (
          <li key={genre}>
            <button
              className={`rounded border p-2 ${curGenre === genre ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} `}
              onClick={() => changeGenre(genre)}
            >
              #{genre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreSelector;
