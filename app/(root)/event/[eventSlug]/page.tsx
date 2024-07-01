"use client";
import { useEffect, useState } from "react";
import { EventDetails } from "@/types";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

// Mock event details
const mockEventDetails: EventDetails = {
  id: "1",
  name: "Doctor Faustus by Christopher Marlowe",
  startDateTime: new Date("2022-02-02"),
  location: "Jakarta, Indonesia",
  imageUrl: "/chess.webp",
  description:
    "Join us for an incredible performance of Doctor Faustus, a play by Christopher Marlowe. Experience the tale of a man who sells his soul to the devil in exchange for power and knowledge.",
  isFree: false,
  price: "50000",
  organizer: { _id: "1", name: "Mock Organizer" },
};

export default function EventDetailPage() {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

  useEffect(() => {
    // Simulate fetching event details based on the ID query parameter
    // For the mock, use the mockEventDetails directly
    setEventDetails(mockEventDetails);
  }, []);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-12 grid grid-cols-3 max-w-screen-xl mx-auto gap-6 min-h-screen">
      <div className="col-span-2 space-y-12">
        <div className="w-full">
          <Image
            src={eventDetails.imageUrl}
            width={900}
            height={450}
            alt={eventDetails.name}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">About event</h2>
          <p>{eventDetails.description}</p>
        </div>

        <p className="mt-4 font-bold text-2xl">
          {eventDetails.isFree
            ? "Free"
            : `Rp. ${
                eventDetails.price
                  ? eventDetails.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "N/A"
              }`}
        </p>
      </div>
      <div className="sticky top-0 space-y-9 h-fit">
        <div className="border shadow-md p-5 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{eventDetails.name}</h1>
          <div className="text-lg text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(eventDetails.startDateTime).toLocaleDateString(
                undefined,
                {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="w-5 h-5" />
              {eventDetails.location}
            </div>
          </div>
          <hr />
          <p className="mt-4 font-semibold">
            Organized by: {eventDetails.organizer.name}
          </p>
        </div>
        <div className="border shadow-md p-5 rounded-lg text-center">
          <div className=" p-3 rounded-lg bg-blue-500 text-white">Button</div>
        </div>
        <div className="flex flex-col gap-2.5">
          <p>Share this event</p>
          <div className="space-x-2">
            <Link href="">facebook</Link>
            <Link href="">instagram</Link>
            <Link href="">Copy Link</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
