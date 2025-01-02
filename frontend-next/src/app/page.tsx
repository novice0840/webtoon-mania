import { Button } from "@/components/ui/button";
import Post from "./components/Post";
import Header from "./components/Header";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div className="container mx-auto border border-rose-500">
      <Header />
    </div>
  );
}
