"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReplyList from "./ReplyList";

const Reply = () => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsReplyOpen(!isReplyOpen)}
        size="sm"
        variant="ghost"
        className="text-blue-600"
      >
        답글 {isReplyOpen ? "숨기기" : "보기"} 14개
      </Button>
      {isReplyOpen && <ReplyList />}
    </div>
  );
};

export default Reply;
