"use client";
import { useQuery } from "@tanstack/react-query";
import { EventDetails } from "@/types";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import BookingModal from "./_components/BookingModal";
import { useParams, usePathname } from "next/navigation";
import { fetchEventDetails } from "@/libs/api/api-libs";
import ShareButton from "./_components/ShareButton";
import { format } from "date-fns";
import { EventDetailSkeleton } from "@/components/shared/Skeleton";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const pathname = usePathname();

  const { data, isPending, isError, error } = useQuery<EventDetails, Error>({
    queryKey: ["eventDetails", eventId],
    queryFn: () => fetchEventDetails(eventId),
  });

  const cheapestTicketPrice =
    data && data.tickets[0].price !== 0
      ? Math.min(...data.tickets.map((ticket) => ticket.price))
      : null;

  if (isPending) return <EventDetailSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="my-12 grid grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto gap-6 min-h-screen px-4 lg:px-0">
      <div className="lg:col-span-2 space-y-12">
        <div className="w-full">
          <Image
            src={data.imageUrl}
            width={900}
            height={450}
            alt={data.name}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">About event</h2>
            <p className="lg:font-semibold lg:text-2xl text-lg font-medium">
              {data.isFree ? "Free Event" : "Paid Event"}
            </p>
          </div>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="lg:sticky top-6 space-y-9 h-fit">
        <div className="border shadow-md p-5 space-y-4 rounded-lg">
          <h1 className="text-3xl font-bold ">{data.name}</h1>
          <div className="text-lg text-stone-700 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {format(new Date(data.date), "PPP")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {format(new Date(data.date), "pp")}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {data.location}
            </div>
          </div>
          <hr />
          <p>
            Organized by:{" "}
            <span className="font-semibold capitalize">
              {data.organizer.name}
            </span>
          </p>
        </div>
        <div className="border shadow-md p-5 rounded-lg text-center space-y-2">
          {cheapestTicketPrice && (
            <p className="text-lg">
              Price starts from{" "}
              <span className="font-semibold">
                Rp. {cheapestTicketPrice.toLocaleString()}
              </span>
            </p>
          )}
          <BookingModal event={data} />
        </div>
        <div className="flex flex-col gap-2.5  items-center lg:items-start">
          <p>Share this event</p>
          <ShareButton pathname={pathname} eventName={data.name} />
        </div>
      </div>
    </div>
  );
}
