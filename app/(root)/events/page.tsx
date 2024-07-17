"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilteredEvents } from "@/libs/api/api-libs";
import { Event, Filters } from "@/types";
import FilterBar from "./_components/FilterBar";
import EventList from "./_components/EventList";
import { SearchEventSkeleton } from "@/components/shared/Skeleton";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const initialFilters: Filters = {
    name: "",
    categoryId: "",
    location: "",
    sort: "",
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const location = searchParams.get("location") || "";
    const sort = searchParams.get("sort") || "";
    setFilters({ name, categoryId, location, sort });
    console.log(filters);
  }, [searchParams]);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  console.log(filters);

  const queryString = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const { data, isPending, isError, error } = useQuery<Event[], Error>({
    queryKey: ["events", queryString],
    queryFn: () => fetchFilteredEvents(queryString),
  });
  console.log(data);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(newFilters)) {
      if (value) searchParams.append(key, value);
    }
    router.push(`/events?${searchParams}`);
  };

  const clearFilters = () => {
    router.push("/events");
    setFilters(initialFilters);
  };

  if (isPending) return <SearchEventSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="relative w-full max-w-screen-xl h-full flex flex-col my-8 space-y-6 mx-auto px-4 sm:px-6 lg:px-8">
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        totalEvents={data?.length ?? 0}
      />
      <EventList events={data ?? []} />
    </div>
  );
}
