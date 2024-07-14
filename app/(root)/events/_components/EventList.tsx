import EventCard from "@/components/shared/EventCard";
import { Event } from "@/types";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.length ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <div className="text-gray-600 text-lg text-center w-full col-span-full">
          No events found.
        </div>
      )}
    </div>
  );
}
