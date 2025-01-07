"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

const SearchForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = formData.get("search");

    console.log("Input value:", searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input name="search" placeholder="검색" />
      <Button variant="outline">검색</Button>
    </form>
  );
};

export default SearchForm;
