import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Button>Click me</Button>
      <Post posts={posts} />
    </div>
  );
}
