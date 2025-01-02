import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <header className="flex h-24 min-w-96 items-center justify-between gap-4">
      <div className="hidden flex-shrink-0 sm:block">
        <Image src="/logo.svg" alt="logo" width={96} height={96} />
      </div>
      <div className="basis-144">
        <SearchForm />
      </div>
      <div className="flex gap-4">
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </div>
    </header>
  );
};

export default Header;
