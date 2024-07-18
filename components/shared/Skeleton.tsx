import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function EventsWithFilterSkeleton() {
  return (
    <>
      <section className="py-4">
        <div className="wrapper flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-center mb-6">
            <Skeleton className="w-40 h-8" />
          </h2>
          <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6 xl:gap-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 rounded-full mb-2" />
                <Skeleton className="w-20 h-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="wrapper">
          <h2 className="text-2xl text-center font-semibold mb-6">
            <Skeleton className="w-60 h-8 mx-auto" />
          </h2>
          <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 my-4 md:my-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full p-4 border rounded-lg">
                <Skeleton className="w-full h-40 mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function SearchEventSkeleton() {
  return (
    <div className="w-full max-w-screen-xl flex px-10 mx-auto gap-6 min-h-screen">
      <div className="w-full flex flex-col my-8 space-y-6">
        <div className="w-full flex justify-between items-center flex-wrap gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-28" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <Card className="max-w-[300px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
          <div className="absolute top-0 left-0 p-1.5">
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="absolute bottom-0 right-0 p-1.5">
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-4 space-y-2">
        <Skeleton className="h-6 w-4/5" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function EventDetailSkeleton() {
  return (
    <div className="my-12 grid grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto gap-6 min-h-screen px-4 lg:px-0">
      <div className="lg:col-span-2 space-y-12">
        <div className="w-full">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-28" />
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      <div className="lg:sticky top-6 space-y-9 h-fit">
        <div className="border shadow-md p-5 space-y-4 rounded-lg">
          <Skeleton className="h-10 w-60" />
          <div className="text-lg text-stone-700 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <hr />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="border shadow-md p-5 rounded-lg text-center space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex flex-col gap-2.5  items-center lg:items-start">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Skeleton className="h-8 w-1/3 mb-6" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
