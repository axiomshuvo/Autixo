import { getRandomCars } from "@/app/lib/datafetch";
import { Card } from "@heroui/react";
import Image from "next/image";

export default async function AvailableCars() {
  const randomCars = await getRandomCars();
  console.log(randomCars);

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-semibold">Available Cars</h2>
      <p className="text-lg text-gray-300">
        Instant Online Approval, Fast and Free
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {randomCars.map((car) => (
          <Card key={car._id} className="">
            <Image
              alt={car.carName}
              className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
              loading="lazy"
              width={640}
              height={640}
              src={car.imageUrl}
            />
            <Card.Header>
              <Card.Title>{car.carName}</Card.Title>
              <Card.Description>{car.description}</Card.Description>
            </Card.Header>
          </Card>
        ))}
      </div>
    </div>
  );
}
