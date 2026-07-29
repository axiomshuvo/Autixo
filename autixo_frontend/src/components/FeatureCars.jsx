import { getRandomCars } from "@/app/lib/datafetch";
import CarCard from "./CarCard";

export default async function FeatureCars() {
  const randomCars = await getRandomCars();
  // console.log(randomCars);

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-semibold">Available Cars</h2>
      <p className="text-lg text-gray-300">
        Instant Online Approval, Fast and Free
      </p>
      <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-4">
        {randomCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}
