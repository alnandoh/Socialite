import EventCard from "@/components/shared/EventCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function page() {
  return (
    <div className="w-full flex px-10 mx-auto gap-6 min-h-screen">
      <div className="min-w-52 h-full space-y-4 border-r px-4 py-8">
        <div className="flex justify-between">
          <p>Filter</p>
          <div className="cursor-pointer">
            <RotateCcw />
          </div>
        </div>
        <hr />
        <div className="cursor-pointer">Event Online</div>
        <div className="cursor-pointer">Lokasi</div>
        <hr />
        <div className="cursor-pointer">Format</div>
        <div className="cursor-pointer">Topik</div>
        <hr />
        <div className="cursor-pointer">Harga</div>
        <div className="cursor-pointer">Waktu</div>
      </div>
      <div className="flex flex-col my-8 space-y-4">
        <div className="w-full flex justify-between">
          <p>Show 1 - 8 from 100 events</p>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 justify-between">
          {Array.from({ length: 8 }).map((_, index) => (
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
    </div>
  );
}
