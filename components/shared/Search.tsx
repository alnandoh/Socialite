"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";

// Mock data
const mockEvents = [
  "Summer Music Festival 2024",
  "Summer Music Festival 2023",
  "Tech Conference: AI and Beyond",
  "Annual Charity Gala",
  "Business Leadership Summit",
  "Art Exhibition: Modern Perspectives",
  "Food and Wine Expo",
  "Fitness Boot Camp Weekend",
  "Photography Workshop Series",
  "International Film Festival",
  "Eco-Friendly Products Showcase",
];

const fetchSuggestions = async (query: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockEvents
    .filter((event) => event.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
};

export default function Search({
  placeholder = "Search events...",
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery === "" || searchQuery.trim() === "") return;
      router.push(`/events?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    },
    [router]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSelectedIndex(-1);
    setShowSuggestions(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (event.key === "Enter") {
      if (selectedIndex > -1) {
        setQuery(suggestions[selectedIndex]);
        performSearch(suggestions[selectedIndex]);
      } else {
        performSearch(query);
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedQuery) {
        const results = await fetchSuggestions(debouncedQuery);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    getSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative max-w-[400px] w-full">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="w-full border border-gray-300 placeholder:text-gray-500 focus:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
        />
        <button
          onClick={() => performSearch(query)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full max-w-[400px] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}
