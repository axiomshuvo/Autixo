import { getAllCars } from "@/app/lib/datafetch";
import CarCard from "@/components/CarCard";
import PaginationComponent from "@/components/PaginationComponent";

export default async function ExploreCars({ searchParams }) {
  // console.log(searchParams);
  const params = await searchParams;

  const page = Number(params.page) || 1;
  console.log("Current Page:", page);
  const cars = await getAllCars(page, 12);
  console.log(cars.currentPage);

  // console.log(cars);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">
        Explore All Listed Cars
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cars.cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <PaginationComponent
        currentPage={cars.currentPage}
        totalPages={cars.totalPages}
      />
    </div>
  );
}
