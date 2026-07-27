import { getAllCars } from "@/app/lib/datafetch";

export default async function ExploreCars() {
  const cars = await getAllCars();
  console.log(cars);

  return (
    <div>
      <h1>ExploreCars</h1>
    </div>
  );
}
