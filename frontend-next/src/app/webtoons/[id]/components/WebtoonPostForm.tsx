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
      <div>
        <div>
          <div title="이미지">
            <Image src="/image.svg" alt="이미지" width={20} height={20} />
          </div>
          <div title="투표">
            <Image src="/select.svg" alt="투표" width={20} height={20} />
          </div>
          <div title="동영상">
            <Image src="/video.svg" alt="동영상" width={20} height={20} />
          </div>
        </div>
        <Button>등록</Button>
      </div>
    </form>
  );
};

export default WebtoonPostForm;
