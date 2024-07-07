"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import { debounce } from "lodash";

export default function Search({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) {
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useMemo(
    () =>
      debounce((keyword: string) => {
        if (!keyword || keyword.trim() === "") return;
        router.push(`?search=${keyword}`);
      }, 1000),
    [router]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch2 = () => {
    // Debounce for 1 sec
    // Get the search keyword
    // Pass it to the search route
    // Save the keyword in the searchbar & search variable
    // use the saved keyword to fetch the search results via API using query param
    // use reqctquery, trigger the api call from this component
    // the component that use
    // router.push(`/search/${search}`);
  };

  return (
    <div className="relative w-[400px] flex items-center justify-center">
      <button onClick={() => debouncedSearch(query)}>
        <SearchIcon className="absolute right-3 top-2" />
      </button>
      <Input
        type="text"
        placeholder={placeholder}
        ref={searchRef}
        value={query}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            debouncedSearch(query);
          }
        }}
        className="border border-gray-300 placeholder:text-gray-500 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
