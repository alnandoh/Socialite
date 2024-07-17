import TopBanner from "./_components/TopBanner";
import EventsWithFilter from "./_components/EventsWithFilter";

export default function Home() {
  return (
    <div className="space-y-12 pb-6 flex-grow">
      <TopBanner />

      <EventsWithFilter />
    </div>
  );
}
