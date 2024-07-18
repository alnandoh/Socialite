import EventCard from "@/components/shared/EventCard";
import { Event } from "@/types";

interface EventSectionProps {
  title: string;
  events: Event[];
}

export default function EventSection({ title, events }: EventSectionProps) {
  return (
    <section>
      <div className="wrapper">
        <h2 className="text-2xl text-center font-semibold">{title}</h2>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 my-4 md:my-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
