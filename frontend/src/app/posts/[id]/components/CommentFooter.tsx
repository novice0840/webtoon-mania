import React from "react";
import Image from "next/image";

const CommentFooter = () => {
  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="flex items-center">
        <Image src="/like.svg" alt="좋아요" width={20} height={20} />
        <span>1.4K</span>
      </span>
      <span className="flex items-center">
        <Image src="/dislike.svg" alt="싫어요" width={20} height={20} />
        <span>1.4K</span>
      </span>
      <span>답글</span>
    </div>
  );
};

export default CommentFooter;
