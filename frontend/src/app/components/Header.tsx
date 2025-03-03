import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchForm from "./SearchForm";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-24 min-w-96 items-center justify-between gap-4">
      <div className="hidden flex-shrink-0 sm:block">
        <Link href="/">
          <Image priority src="/logo.svg" alt="logo" width={96} height={96} />
        </Link>
      </div>
      <div className="basis-144">
        <SearchForm />
      </div>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/signin">로그인</Link>
        </Button>
        <Button variant="outline">
          <Link href="/signup">회원가입</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
