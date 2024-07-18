import { slugify } from "@/libs/utils/slugify";
import { Event } from "@/types";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/event/${event.id}`}
      className="max-w-[300px] w-full bg-card border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
        <Image
          src={event.imageUrl || ""}
          alt={event.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover bg-slate-300"
        />
        <div className="absolute top-0 left-0 bg-orange-400/25 backdrop-blur p-1.5 text-sm rounded-md font-semibold">
          <p>{event.categoryName || "Music"}</p>
        </div>
        <div className="absolute bottom-0 right-0 bg-orange-400/25 backdrop-blur-lg p-1.5 text-sm rounded-md">
          <p className="font-bold">{event.isFree ? "Free" : "Paid"}</p>
        </div>
      </div>
      <div className="px-5 py-4 space-y-2">
        <h3 className="text-xl font-semibold leading-tight capitalize line-clamp-2">
          {event.name}
        </h3>
        <div className="flex items-center gap-2 text-stone-800 text-sm pt-2">
          <Calendar className="size-4" />
          {event.date ? format(new Date(event.date), "cccc, dd MMM yyyy") : ""}
        </div>
        <div className="flex items-center gap-2 text-stone-800 text-sm">
          <MapPin className="size-4" />
          {event.location}
        </div>
      </div>
    </Link>
  );
}
