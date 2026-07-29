import { getCarDetails } from "@/app/lib/datafetch";
import { Button, Card, CardContent, CardHeader, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  LuBadgeCheck,
  LuCar,
  LuFuel,
  LuMapPin,
  LuSettings2,
  LuUsers,
} from "react-icons/lu";

function getImageList(car) {
  if (Array.isArray(car?.images) && car.images.length) return car.images;
  if (Array.isArray(car?.imageUrls) && car.imageUrls.length)
    return car.imageUrls;
  if (car?.imageUrl) return [car.imageUrl];
  return ["/assets/images/slider-image1.jpg"];
}

function getFeatures(car) {
  if (Array.isArray(car?.features) && car.features.length) return car.features;
  return [
    "Air Conditioning",
    "Bluetooth",
    "Backup Camera",
    "Leather Seats",
    "GPS Navigation",
    "USB Charger",
  ];
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const car = await getCarDetails(id);

  if (!car) {
    return (
      <div className="mx-auto w-[92%] max-w-7xl py-10">
        <Card className="border border-danger-200 bg-danger-50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-danger-700">
              Car details not found
            </h2>
            <p className="mt-2 text-sm text-danger-600">
              We could not load this car right now. Please try again.
            </p>
            <Link href="/explore-cars" className="mt-4 inline-block">
              <Button color="primary" variant="flat">
                Back to Explore Cars
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = getImageList(car);
  const mainImage = images[0];
  const features = getFeatures(car);

  const carName = car?.carName || "Toyota Fortuner";
  const rating = car?.rating ?? 4.8;
  const reviews = car?.reviewsCount ?? 20;
  const price = car?.dailyRentPrice ?? 120;
  const carType = car?.carType || "SUV";
  const seats = car?.seatCapacity ? `${car.seatCapacity} Seats` : "7 Seats";
  const transmission = car?.transmission || "Automatic";
  const fuelType = car?.fuelType || "Diesel";
  const location = car?.location || "Dhaka, Bangladesh";
  const availability = car?.availability || "Available";
  const bookingCount = car?.bookingCount ?? 23;
  const description =
    car?.description ||
    "The Toyota Fortuner is a mid-size SUV known for its rugged performance, comfortable interior, and reliability. Perfect for both city drives and off-road adventures.";

  return (
    <div className="mx-auto w-[92%] max-w-7xl py-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-foreground-500">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>›</span>
        <Link href="/explore-cars" className="hover:text-foreground">
          Explore Cars
        </Link>
        <span>›</span>
        <span className="font-medium text-foreground">{carName}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        <div className="lg:col-span-2 lg:flex lg:flex-col">
          <Card className="min-h-75 overflow-hidden border border-default-200 lg:min-h-130">
            <CardContent className="relative h-full p-0">
              <Image
                src={mainImage}
                alt={carName}
                width={1200}
                height={700}
                className="h-full min-h-75 w-full object-cover sm:min-h-105 lg:min-h-130"
                priority
              />
              {/* <button
                className="absolute right-4 top-4 rounded-xl bg-white/90 p-2 shadow"
                aria-label="Save this car"
                type="button"
              >
                <LuHeart className="size-5 text-default-600" />
              </button> */}
            </CardContent>
          </Card>

          {images.length > 1 ? (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <Card
                  key={`${img}-${idx}`}
                  className="overflow-hidden border border-default-200"
                >
                  <CardContent className="p-0">
                    <Image
                      src={img}
                      alt={`${carName} ${idx + 1}`}
                      width={280}
                      height={180}
                      className="h-20 w-full object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>

        <Card className="flex min-h-80 flex-col border border-default-200 shadow-sm lg:min-h-130">
          <CardHeader className="flex-col items-start gap-1 p-6 pb-4">
            <h1 className="text-3xl font-semibold leading-tight">{carName}</h1>
            <p className="text-sm text-foreground-500">
              <span className="font-semibold text-warning-500">★ {rating}</span>{" "}
              ({reviews} Reviews)
            </p>
            <p className="mt-2 text-4xl font-bold text-primary">
              ${price}
              <span className="ml-1 text-base font-medium text-foreground-500">
                /day
              </span>
            </p>
          </CardHeader>

          <div className="mx-6 border-t border-default-200" />

          <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-6">
            <div className="grid grid-cols-[22px_1fr_auto] items-center gap-3 text-sm">
              <LuCar className="text-foreground-500" />
              <span className="text-foreground-500">Car Type</span>
              <span className="font-medium">{carType}</span>

              <LuUsers className="text-foreground-500" />
              <span className="text-foreground-500">Seats</span>
              <span className="font-medium">{seats}</span>

              <LuSettings2 className="text-foreground-500" />
              <span className="text-foreground-500">Transmission</span>
              <span className="font-medium">{transmission}</span>

              <LuFuel className="text-foreground-500" />
              <span className="text-foreground-500">Fuel Type</span>
              <span className="font-medium">{fuelType}</span>

              <LuMapPin className="text-foreground-500" />
              <span className="text-foreground-500">Location</span>
              <span className="font-medium">{location}</span>

              <LuBadgeCheck className="text-foreground-500" />
              <span className="text-foreground-500">Availability</span>
              <Chip size="sm" color="success" variant="flat">
                {availability}
              </Chip>

              <LuBadgeCheck className="text-foreground-500" />
              <span className="text-foreground-500">Booking Count</span>
              <span className="font-medium">{bookingCount}</span>
            </div>

            <Button color="primary" size="lg" className="w-full font-semibold">
              Book Now
            </Button>

            {/* <Button variant="bordered" size="lg" className="w-full">
              <LuHeart className="mr-2 size-4" />
              Save for Later
            </Button> */}
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-2xl font-semibold">About This Car</h2>
          <p className="text-foreground-600 leading-7">{description}</p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold">Features</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, idx) => (
              <div
                key={`${feature}-${idx}`}
                className="flex items-center gap-2 text-foreground-700"
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <LuBadgeCheck className="size-3.5" />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
