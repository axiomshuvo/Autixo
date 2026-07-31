import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full rounded-lg" />

      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  );
}
