import React from "react";
import Image from "next/image";

const WebtoonPostItem = () => {
  return (
    <div>
      <div>프로필 이미지</div>
      <div>
        <div>
          <span>작성자</span>
          <span>작성 시점</span>
          <span>더보기</span>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
          tempora repudiandae beatae similique nihil sapiente odit repellat ex,
          vero nemo magnam commodi debitis vitae cupiditate delectus, vel, esse
          magni. Atque.
        </p>
        <div>
          <span>
            <div title="좋아요">
              <Image src="/like.svg" alt="좋아요" width={20} height={20} />
            </div>
            <span>1.4K</span>
            <div title="싫어요">
              <Image src="/dislike.svg" alt="싫어요" width={20} height={20} />
            </div>

            <span>1.4K</span>
          </span>
          <span>
            <div title="댓글">
              <Image src="/chat.svg" alt="chat" width={20} height={20} />
            </div>
            <span>1.4K</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebtoonPostItem;
