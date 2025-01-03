"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const WebtoonPostList = () => {
  return (
    <div>
      <form>
        <Textarea
          placeholder="글을 작성해주세요"
          className="h-auto resize-none overflow-hidden"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        <div>
          <div>
            <Image src="/image.svg" alt="이미지" width={20} height={20} />
            <Image src="/select.svg" alt="투표" width={20} height={20} />
            <Image src="/video.svg" alt="GIF" width={20} height={20} />
          </div>
          <Button>등록</Button>
        </div>
      </form>
      <ul>
        <li>
          <div>
            <div>프로필 이미지</div>
            <div>
              <div>
                <span>작성자</span>
                <span>작성 시점</span>
                <span>더보기</span>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reiciendis tempora repudiandae beatae similique nihil sapiente
                odit repellat ex, vero nemo magnam commodi debitis vitae
                cupiditate delectus, vel, esse magni. Atque.
              </p>
              <div>
                <span>
                  <Image src="/like.svg" alt="like" width={20} height={20} />
                  <span>1.4K</span>
                  <Image
                    src="/dislike.svg"
                    alt="dislike"
                    width={20}
                    height={20}
                  />
                  <span>1.4K</span>
                </span>
                <span>
                  <Image src="/chat.svg" alt="chat" width={20} height={20} />
                  <span>1.4K</span>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WebtoonPostList;
