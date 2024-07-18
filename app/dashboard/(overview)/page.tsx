import { Calendar } from "lucide-react";
import React from "react";
import { RevenueChart } from "./_components/RevenueChart";

const DashboardCard = [
  {
    title: "Total Events",
    data: "28",
  },
  {
    title: "Total Revenue",
    data: "Rp. 127.860.000",
  },
  {
    title: "Total Attendees",
    data: "29.363",
  },
  {
    title: "Total Ratings",
    data: "4.5",
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full lg:p-10 p-4 space-y-4">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {DashboardCard.map((card, index) => (
          <div
            key={index}
            className="p-4 rounded-lg flex flex-col gap-4 items-center border bg-stone-200"
          >
            <div className="flex gap-4 items-center">
              <div className="size-14 bg-white flex items-center justify-center rounded-full">
                <Calendar className="size-8" />
              </div>
              <p className="text-xl font-medium bg-white rounded-lg p-2">
                {card.title}
              </p>
            </div>
            <div className="space-x-2 bg-white py-4 w-full rounded-lg text-center">
              <p className="text-3xl font-bold">{card.data}</p>
            </div>
          </div>
        ))}
      </div>
      <RevenueChart />
    </div>
  );
}
