import EventCard from "@/components/shared/EventCard";
import { Event } from "@/types";
import { Frown } from "lucide-react";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 my-4 md:my-6">
      {events.length ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <div className="flex flex-col justify-center items-center text-stone-700 text-lg col-span-full pb-28">
          <Frown className="w-16 h-16 mb-4" />
          <p>No events found.</p>
          <p className="mt-2 text-sm">
            Try adjusting your filters or come back later.
          </p>
        </div>
      )}
    </div>
  );
}
