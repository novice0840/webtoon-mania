import PostItem from "@/app/components/PostItem";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <PostItem />
      <div className="mt-4">
        <CommentForm />
        <CommentList />
      </div>
    </div>
  );
}
