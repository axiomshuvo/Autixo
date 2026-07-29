import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  const {
    _id,
    carName,
    description,
    imageUrl,
    seatCapacity,
    carType,
    dailyRentPrice,
  } = car;
  // console.log(car);
  return (
    <div>
      <Card key={_id} className="p-0">
        <Image
          alt={carName}
          className="pointer-events-none aspect-square   rounded-t-2xl object-cover select-none"
          loading="lazy"
          width={640}
          height={640}
          src={imageUrl}
        />
        <Card.Header className="p-5">
          <Card.Title className="text-xl font-bold truncate">
            {carName}
          </Card.Title>
          <Card.Description>
            <span className="flex items-center gap-2 text-muted">
              <span>{seatCapacity}</span>
              <span className="size-1.5 rounded-full bg-foreground/40" />
              <span>{carType}</span>
            </span>
            <span className="block">
              <span className="text-lg ">
                <span className="text-accent font-bold  ">
                  ${dailyRentPrice}
                </span>
                /Day
              </span>
            </span>
          </Card.Description>
          <Link href={`/explore-cars/${_id}`} className="mt-4 block">
            <Button fullWidth size="lg">
              View Details
            </Button>
          </Link>
        </Card.Header>
      </Card>
    </div>
  );
}
