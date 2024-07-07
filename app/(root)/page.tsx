import TopBanner from "./_components/TopBanner";
import EventSection from "./_components/EventSection";

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <div className="wrapper flex justify-center">
          <TopBanner />
        </div>
      </section>

      <EventSection title="Upcoming Events" url="/events" />

      <EventSection title="Events Category" url="/events" />
    </div>
  );
}
