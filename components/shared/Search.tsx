"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (searchRef.current) {
      const keyword = searchRef.current.value;

      if (!keyword || keyword.trim() === "") return;

      if (
        event.type === "click" ||
        (event as React.KeyboardEvent).key === "Enter"
      ) {
        event.preventDefault();
        router.push(`/search/${keyword}`);
      }
    }
  };
  return (
    <div className="relative w-[400px] flex items-center justify-center">
      <button>
        <SearchIcon className="absolute right-3 top-2" />
      </button>
      <Input
        type="text"
        placeholder={placeholder}
        ref={searchRef}
        // onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 placeholder:text-gray-500 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
