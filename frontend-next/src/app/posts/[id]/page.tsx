import PostItem from "@/app/components/PostItem";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center gap-4">
      <PostItem />
    </div>
  );
}
