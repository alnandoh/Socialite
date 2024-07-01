import EventCard from "@/components/shared/EventCard";
import TopBanner from "./_components/TopBanner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section>
        <div className="wrapper flex justify-center">
          <TopBanner />
        </div>
      </section>

      <section>
        <div className="wrapper">
          <h2>Upcoming Events</h2>
          <div className="grid grid-cols-4 gap-x-10 gap-y-10 my-4">
            {Array.from({ length: 4 }).map((_, index) => (
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
      </section>

      <section>
        <div className="wrapper">
          <h2>All Events</h2>
          <div className="grid grid-cols-4 gap-x-10 gap-y-10 my-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card className="">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
