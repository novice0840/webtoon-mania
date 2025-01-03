"use client";

import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const WebtoonPostForm = () => {
  return (
    <form>
      <Textarea
        placeholder="글을 작성해주세요"
        className="h-auto resize-none overflow-hidden"
        onInput={(e) => {
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
      />
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4">
          <div title="이미지" className="cursor-pointer">
            <Image src="/image.svg" alt="이미지" width={20} height={20} />
          </div>
          <div title="투표" className="cursor-pointer">
            <Image src="/select.svg" alt="투표" width={20} height={20} />
          </div>
          <div title="동영상" className="cursor-pointer">
            <Image src="/video.svg" alt="동영상" width={20} height={20} />
          </div>
        </div>
        <Button>등록</Button>
      </div>
    </form>
  );
};

export default WebtoonPostForm;
