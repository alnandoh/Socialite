"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilteredEvents } from "@/libs/api/api-libs";
import { Event, Filters } from "@/types";
import FilterBar from "./_components/FilterBar";
import EventList from "./_components/EventList";
import { SearchEventSkeleton } from "@/components/shared/Skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventResponse {
  data: Event[];
  message: string;
  page: number;
  totalData: number;
  totalPages: number;
}

export default function Page() {
  const initialFilters: Filters = {
    name: "",
    categoryId: "",
    location: "",
    sort: "",
    page: 0,
    limit: 8,
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const location = searchParams.get("location") || "";
    const sort = searchParams.get("sort") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    setFilters({ ...initialFilters, name, categoryId, location, sort, page });
  }, [searchParams]);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const queryString = Object.entries(filters)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const { data, isPending, isError, error } = useQuery<EventResponse, Error>({
    queryKey: ["events", queryString],
    queryFn: () => fetchFilteredEvents(queryString),
  });

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    updateURL(initialFilters);
  };

  const updateURL = (newFilters: Filters) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(newFilters)) {
      if (value !== "" && value !== initialFilters[key as keyof Filters]) {
        searchParams.append(key, value.toString());
      }
    }
    router.push(`/events?${searchParams}`);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  if (isPending) return <SearchEventSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  const events = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.page || 0;

  return (
    <div className="relative w-full max-w-screen-xl h-full flex flex-col my-8 space-y-6 mx-auto px-4 sm:px-6 lg:px-8">
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        totalEvents={data?.totalData ?? 0}
        currentPage={currentPage}
        itemsPerPage={filters.limit}
      />
      <EventList events={events} />
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
