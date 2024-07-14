"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilteredEvents } from "@/libs/api/api-libs";
import { SearchEventSkeleton } from "@/components/shared/skeleton";
import { Event, Filters } from "@/types";
import FilterBar from "./_components/FilterBar";
import EventList from "./_components/EventList";

export default function Page() {
  const initialFilters: Filters = {
    categoryId: "",
    location: "",
    sortBy: "",
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const queryString = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const { data, isPending, isError, error } = useQuery<Event[], Error>({
    queryKey: ["events", queryString],
    queryFn: () => fetchFilteredEvents(queryString),
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  if (isPending) return <SearchEventSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col my-8 space-y-6">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          totalEvents={data?.length ?? 0}
        />
        <EventList events={data ?? []} />
      </div>
    </div>
  );
}
