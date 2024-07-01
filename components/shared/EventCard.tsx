import { slugify } from "@/libs/slugify";
import { Event } from "@/types";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const slug = slugify(event.name);
  return (
    <Link
      href={`/event/${slug}`}
      className="bg-card border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <Image
        src={event.imageUrl}
        width={300}
        height={150}
        alt={event.name}
        className="w-full object-cover rounded-lg bg-slate-300"
      />
      <div className="px-5 py-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-tight">{event.name}</h3>
          <div className="flex items-center gap-2 text-stone-700 text-sm">
            <Calendar className="size-4" />
            {format(new Date(event.startDateTime), "EEE, dd MMM yyyy")}
          </div>
          <div className="flex items-center gap-2 text-stone-700 text-sm">
            <MapPin className="size-4" />
            {event.location}
          </div>
        </div>
        <p className="font-bold">
          {event.isFree
            ? "Free"
            : `Rp. ${
                event.price
                  ? event.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "N/A"
              }`}
        </p>
      </div>
    </Link>
  );
}
