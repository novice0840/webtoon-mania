"use client";

import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";

const CommentForm = () => {
  return (
    <form>
      <Textarea
        placeholder="댓글을 작성해주세요"
        className="h-auto resize-none overflow-hidden"
        onInput={(e) => {
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
      />
      <div className="flex justify-end gap-4 p-4">
        <Button variant="outline">취소</Button>
        <Button>등록</Button>
      </div>
    </form>
  );
};

export default CommentForm;
