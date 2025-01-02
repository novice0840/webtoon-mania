import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const SearchForm = () => {
  return (
    <form className="flex gap-4">
      <Input placeholder="검색" />
      <Button>확인</Button>
    </form>
  );
};

export default SearchForm;
