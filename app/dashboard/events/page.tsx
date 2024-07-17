import { columns } from "./_components/Columns";
import EventList from "./_components/EventList";

type Event = {
  id: string;
  name: string;
  startDate: Date;
  location: string;
};

const events: Event[] = [
  {
    id: "1",
    name: "Tech Conference 2024",
    startDate: new Date("2024-08-15T09:00:00Z"),
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Music Festival",
    startDate: new Date("2024-07-20T14:00:00Z"),
    location: "Los Angeles, CA",
  },
  {
    id: "3",
    name: "Art Exhibition",
    startDate: new Date("2024-09-01T10:00:00Z"),
    location: "New York, NY",
  },
  {
    id: "4",
    name: "Food and Wine Expo",
    startDate: new Date("2024-10-05T12:00:00Z"),
    location: "Napa Valley, CA",
  },
  {
    id: "5",
    name: "Marathon 2024",
    startDate: new Date("2024-11-12T07:00:00Z"),
    location: "Boston, MA",
  },
  {
    id: "6",
    name: "Startup Pitch Night",
    startDate: new Date("2024-08-22T18:00:00Z"),
    location: "Austin, TX",
  },
  {
    id: "7",
    name: "Yoga Retreat",
    startDate: new Date("2024-09-15T08:00:00Z"),
    location: "Sedona, AZ",
  },
  {
    id: "8",
    name: "Book Fair",
    startDate: new Date("2024-07-30T11:00:00Z"),
    location: "Chicago, IL",
  },
  {
    id: "9",
    name: "Film Premiere",
    startDate: new Date("2024-10-18T19:00:00Z"),
    location: "Hollywood, CA",
  },
  {
    id: "10",
    name: "Charity Gala",
    startDate: new Date("2024-12-01T20:00:00Z"),
    location: "Washington, DC",
  },
  {
    id: "11",
    name: "Science Fair",
    startDate: new Date("2024-09-25T09:00:00Z"),
    location: "Seattle, WA",
  },
  {
    id: "12",
    name: "Gaming Convention",
    startDate: new Date("2024-08-12T10:00:00Z"),
    location: "Las Vegas, NV",
  },
  {
    id: "13",
    name: "Fashion Show",
    startDate: new Date("2024-10-22T15:00:00Z"),
    location: "Miami, FL",
  },
  {
    id: "14",
    name: "Environmental Summit",
    startDate: new Date("2024-11-05T09:00:00Z"),
    location: "Portland, OR",
  },
  {
    id: "15",
    name: "Tech Meetup",
    startDate: new Date("2024-07-28T18:30:00Z"),
    location: "San Diego, CA",
  },
];

export default function OrganizerEventsPage() {
  return (
    <div className="w-full p-10 space-y-4">
      <h1 className="text-3xl font-semibold">All Events</h1>
      <div className="rounded-3xl">
        <EventList columns={columns} data={events} />
      </div>
    </div>
  );
}
