import { Card, Skeleton } from "@heroui/react";

export default function CarCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <Skeleton className="aspect-square w-full rounded-none rounded-t-2xl" />

      <Card.Header className="flex flex-col items-start gap-3 p-5">
        <Skeleton className="h-7 w-3/4 rounded-lg" />

        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 rounded-lg" />
          <Skeleton className="h-4 w-20 rounded-lg" />
        </div>

        <Skeleton className="h-5 w-24 rounded-lg" />

        <Skeleton className="mt-2 h-11 w-full rounded-xl" />
      </Card.Header>
    </Card>
  );
}
