import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WebtoonPostItem = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="profile" width={20} height={20} />
            <div>작성자이름</div>
          </div>
          <div title="더보기" className="cursor-pointer">
            <Image src="/dots.svg" alt="more" width={20} height={20} />
          </div>
        </CardTitle>
        <CardDescription>3시간 전</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
          tempora repudiandae beatae similique nihil sapiente odit repellat ex,
          vero nemo magnam commodi debitis vitae cupiditate delectus, vel, esse
          magni. Atque.
        </p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button size="sm" variant="secondary" title="좋아요">
          <Image src="/like.svg" alt="좋아요" width={20} height={20} />
          <span>1.4K</span>
        </Button>
        <Button size="sm" variant="secondary" title="싫어요">
          <Image src="/dislike.svg" alt="싫어요" width={20} height={20} />
          <span>1.4K</span>
        </Button>
        <Button size="sm" variant="secondary" title="댓글">
          <Image src="/chat.svg" alt="댓글" width={20} height={20} />
          <span>1.4K</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebtoonPostItem;
