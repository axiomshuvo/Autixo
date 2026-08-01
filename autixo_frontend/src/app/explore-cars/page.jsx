import { getAllCars } from "@/app/lib/datafetch";
import CarCard from "@/components/CarCard";
import PaginationComponent from "@/components/PaginationComponent";
import { Button, Input } from "@heroui/react";

export default async function ExploreCars({ searchParams }) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const carType = params.carType || "";

  const cars = await getAllCars(page, 12, search, carType);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Explore All Listed Cars
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search by name or narrow results by vehicle type.
        </p>
      </div>

      <form
        method="GET"
        action="/explore-cars"
        className="mb-8 rounded-2xl border border-default-200 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-5"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <Input
            name="search"
            defaultValue={search}
            label="Search by car name"
            placeholder="Try BMW, Corolla, Audi..."
            className="flex-1"
            size="lg"
          />

          <div className="w-full lg:w-56">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Car type
            </label>
            <select
              name="carType"
              defaultValue={carType}
              className="w-full rounded-xl border border-default-300 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Crossover">Crossover</option>
              <option value="MPV">MPV</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>

          <Button type="submit" color="primary" size="lg">
            Search Cars
          </Button>
        </div>
      </form>

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
