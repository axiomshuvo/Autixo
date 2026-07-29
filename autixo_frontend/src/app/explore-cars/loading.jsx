import CarCardSkeleton from "@/components/skeleton/CarCardSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 space-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-20">
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
      <CarCardSkeleton />
    </div>
  );
}
