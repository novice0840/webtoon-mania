import Image from "next/image";
import Reply from "./Reply";
import CommentFooter from "./CommentFooter";

const CommentItem = () => {
  return (
    <div className="flex">
      <div>
        <Image src="/logo.svg" alt="프로필" width={40} height={40} />
      </div>
      <div className="flex-1">
        <div>
          <span className="mr-1 text-xs">김철수</span>
          <span className="text-xs text-slate-600">4개월 전</span>
        </div>
        <p className="mb-2 mt-2 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, deleniti
          odit! Debitis eius ea explicabo consectetur tempore quis ducimus magni
          adipisci! Laborum voluptate commodi mollitia reiciendis beatae
          pariatur consequuntur vitae.
        </p>
        <CommentFooter />
        <Reply />
      </div>
      <div>
        <div title="더보기" className="cursor-pointer">
          <Image src="/dots.svg" alt="더보기" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
