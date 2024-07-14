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
