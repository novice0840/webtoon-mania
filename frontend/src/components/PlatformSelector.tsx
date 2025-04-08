"use client";

interface PlatformSelectorProps {
  platforms: string[];
  changePlatform: (platform: string) => void;
  curPlatform: string;
}

const PlatformSelector = ({
  curPlatform,
  platforms,
  changePlatform,
}: PlatformSelectorProps) => {
  return (
    <div className="w-[80%]">
      <h2 className="text-2xl">플랫폼</h2>
      <ul className="flex flex-wrap gap-2">
        {["all", ...platforms].map((platform) => (
          <li key={platform}>
            <button
              className={`rounded border p-2 ${
                curPlatform === platform
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => changePlatform(platform)}
            >
              {platform === "all" ? "전체" : platform}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelector;
