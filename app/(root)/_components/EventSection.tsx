import EventCard from "@/components/shared/EventCard";
import { Event } from "@/types";

interface EventSectionProps {
  title: string;
  url: string;
}

export default function EventSection({ title, url }: EventSectionProps) {
  return (
    <section>
      <div className="wrapper">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="grid grid-cols-4 gap-x-8 gap-y-8 my-4">
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
