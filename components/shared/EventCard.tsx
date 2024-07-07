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
  const slug = slugify(event.name);
  return (
    <Link
      href={`/event/${slug}`}
      className="bg-card border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative">
        <Image
          src={event.imageUrl}
          width={300}
          height={150}
          alt={event.name}
          className="w-full object-cover rounded-lg bg-slate-300"
        />
        <div className="absolute top-0 left-0 bg-orange-300 p-1 text-sm rounded-md font-semibold">
          Category
        </div>
        <div className="absolute bottom-0 right-0 bg-orange-300 p-1 text-sm rounded-md">
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
      </div>
      <div className="px-5 py-4 relative">
        <h3 className="text-xl font-semibold leading-tight mt-2">
          {event.name}
        </h3>
        <div className="flex items-center gap-2 text-stone-700 text-sm mt-2">
          <Calendar className="size-4" />
          {format(new Date(event.startDateTime), "EEE, dd MMM yyyy")}
        </div>
        <div className="flex items-center gap-2 text-stone-700 text-sm mt-1">
          <MapPin className="size-4" />
          {event.location}
        </div>
      </div>
    </Link>
  );
}
