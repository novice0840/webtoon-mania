import React from "react";
import Image from "next/image";

const CommentItem = () => {
  return (
    <div className="flex">
      <div>
        <Image src="/logo.svg" alt="프로필" width={40} height={40} />
      </div>
      <div className="flex-1">
        <div>
          <span className="text-xs">김철수</span>
          <span className="text-xs">4개월 전</span>
        </div>
        <div className="mb-2 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, deleniti
          odit! Debitis eius ea explicabo consectetur tempore quis ducimus magni
          adipisci! Laborum voluptate commodi mollitia reiciendis beatae
          pariatur consequuntur vitae.
        </div>
        <div className="flex gap-4 text-xs">
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
      </div>
      <div>
        <Image src="/dots.svg" alt="더보기" width={20} height={20} />
      </div>
    </div>
  );
};

export default CommentItem;
