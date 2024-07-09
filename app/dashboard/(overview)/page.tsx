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
    <div className="w-full p-10 space-y-4">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-5">
        {DashboardCard.map((_, index) => (
          <div className="p-4 rounded-lg flex flex-col gap-4 items-center border bg-stone-200">
            <div className="flex gap-4 items-center">
              <div className="size-14 bg-white flex items-center justify-center rounded-full">
                <Calendar className="size-8" />
              </div>
              <p className="text-xl font-medium bg-white rounded-lg p-2">
                {_.title}
              </p>
            </div>
            <div className="space-x-2 bg-white py-4 w-full rounded-lg text-center">
              <p className="text-3xl font-bold">{_.data}</p>
            </div>
          </div>
        ))}
      </div>
      <RevenueChart />
      <div className="grid grid-cols-2 gap-5 my-4">
        <p>Latest Transaction</p>
      </div>
    </div>
  );
}
