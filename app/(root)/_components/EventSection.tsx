import EventCard from "@/components/shared/EventCard";
import { Event } from "@/types";

interface EventSectionProps {
  title: string;
  url: string;
  totalEvents: number;
}

export default function EventSection({
  title,
  url,
  totalEvents,
}: EventSectionProps) {
  return (
    <section>
      <div className="wrapper">
        <h2>{title}</h2>
        <div className="grid grid-cols-4 gap-x-10 gap-y-10 my-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <EventCard
              event={{
                name: "Doctor Faustus by Christopher Marlowe",
                price: "10000",
                isFree: false,
                imageUrl: "",
                location: "Jakarta, Indonesia",
                startDateTime: new Date("2022-02-02"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
