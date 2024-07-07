import { Calendar } from "lucide-react";
import React from "react";

const DashboardCard = [
  {
    title: "Total Events",
    data: "1970",
  },
  {
    title: "Total Events",
    data: "1970",
  },
  {
    title: "Total Events",
    data: "1970",
  },
  {
    title: "Total Events",
    data: "1970",
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
      <div className="grid grid-cols-2 gap-5">
        <p>Revenue</p>
        <p>Latest Transaction</p>
      </div>
    </div>
  );
}
