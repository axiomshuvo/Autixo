import { auth } from "@/app/lib/auth";
import { getBookingListByUserId } from "@/app/lib/datafetch";
import CancelBtn from "@/components/utlis/CancelBtn";
import { Card, Chip } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { LuCalendarDays, LuMapPin, LuUsers } from "react-icons/lu";

export default async function BookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const data = await getBookingListByUserId(userId);
  // console.log("Booking Data:", data);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            My Bookings
          </h1>
          <p className="text-sm text-muted">
            Review your current car reservations and pickup preferences.
          </p>
        </div>
        <Chip color="danger" variant="primary" size="lg">
          {data?.length
            ? `${data.length} active booking${data.length > 1 ? "s" : ""}`
            : "No bookings yet"}
        </Chip>
      </div>

      {data && data.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {data.map(
            (
              {
                _id: bookingId,
                bookingDate,
                driverNeeded,

                car: { carName, imageUrl, seatCapacity, pickupLocation },
              },
              index,
            ) => (
              <Card
                key={`booking-${index}`}
                className="overflow-hidden border border-default-200 bg-background/90 shadow-sm"
              >
                <div className="grid gap-cols-1 md:grid-cols-2">
                  <div className="relative h-full min-h-48 bg-default-100">
                    <Image
                      src={imageUrl || "/assets/images/slider-image1.jpg"}
                      alt={carName}
                      fill
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-col p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 relative flex-1">
                        <h2 className="text-xl font-semibold text-foreground">
                          {carName}
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                          Reservation #{index + 1}
                        </p>
                        <Chip
                          color={driverNeeded ? "accent" : "warning"}
                          variant="primary"
                          size="sm"
                          className="absolute -top-[20px] -right-[20px] whitespace-nowrap"
                        >
                          {driverNeeded ? "Driver needed" : "Self-drive"}
                        </Chip>
                      </div>
                    </div>

                    <div className="my-4 h-px w-full bg-default-200" />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-600">
                        <LuCalendarDays className="size-4 text-primary" />
                        <span>
                          {new Date(bookingDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground-600">
                        <LuUsers className="size-4 text-primary" />
                        <span>{seatCapacity} seats</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground-600 sm:col-span-2">
                        <LuMapPin className="size-4 text-primary" />
                        <span>{pickupLocation}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <CancelBtn bookingId={bookingId} />
                    </div>
                  </div>
                </div>
              </Card>
            ),
          )}
        </div>
      ) : (
        <Card className="border border-default-200 bg-background/80 p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            No bookings found
          </h2>
          <p className="mt-2 text-sm text-muted">
            Your future reservations will appear here once you book a car.
          </p>
        </Card>
      )}
    </section>
  );
}
