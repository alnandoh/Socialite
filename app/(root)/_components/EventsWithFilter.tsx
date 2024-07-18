"use client";
import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import EventSection from "./EventSection";
import { fetchUpcomingEventsByCategory } from "@/libs/api/api-libs";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types";
import { EventsWithFilterSkeleton } from "@/components/shared/Skeleton";
import categories from "@/constants/categories";

export default function EventsWithFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [queryString, setQueryString] = useState<string>("");

  useEffect(() => {
    if (selectedCategory) {
      setQueryString(`?categoryId=${selectedCategory}`);
    } else {
      setQueryString("");
    }
  }, [selectedCategory]);

  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery<Event[]>({
    queryKey: ["events", queryString],
    queryFn: () => fetchUpcomingEventsByCategory(queryString),
  });

  const selectedCategoryLabel = selectedCategory
    ? categories.find((cat) => cat.value === selectedCategory)?.label
    : null;

  if (isPending) return <EventsWithFilterSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <EventSection
        title={
          selectedCategory
            ? `Recently Created ${selectedCategoryLabel} Events`
            : "All Upcoming Events"
        }
        events={events}
      />
    </>
  );
}
