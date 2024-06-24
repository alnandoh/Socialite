import { TopBanner } from "@/components/shared/TopBanner";
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
          <h2>Categories</h2>
          <div></div>
        </div>
      </section>

      <section>
        <div className="wrapper">
          <h2>Upcoming Events</h2>
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
