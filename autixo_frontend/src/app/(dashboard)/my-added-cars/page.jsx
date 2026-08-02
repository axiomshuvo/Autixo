import { auth } from "@/app/lib/auth";
import { getMyAddedCars } from "@/app/lib/datafetch";
import DeleteCar from "@/components/utlis/DeleteCar";
import EditCar from "@/components/utlis/EditCar";
import EmptyCars from "@/components/utlis/EmptyCars";
import { Chip, Table } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

const statusColorMap = {
  available: "success",
  unavailable: "danger",
  "On Leave": "warning",
};

export default async function MyAddedCarPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });
  const tokenResponse = await auth.api.getToken({
    headers: requestHeaders,
  });
  const token = tokenResponse?.token;

  if (!session) {
    return <div>Please login first.</div>;
  }

  const ownerId = session.user.id;

  const myAddedCars = await getMyAddedCars(ownerId, token);
  if (!myAddedCars || myAddedCars.length === 0) {
    return <EmptyCars />;
  }

  //console.log("My Added Cars:", myAddedCars);

  return (
    <Table aria-label="My Added Cars" className="w-full mb-20 ">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header className="">
            <Table.Column isRowHeader>Car Brand Name</Table.Column>
            <Table.Column> Type</Table.Column>
            <Table.Column>Daily Price</Table.Column>
            <Table.Column>Car Capacity</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Availability</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {myAddedCars.map((car) => (
              <Table.Row key={car._id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Image
                      width={400}
                      height={400}
                      src={car.imageUrl}
                      alt={car.carName}
                      className="w-14 h-10 rounded object-cover"
                    />
                    <span>{car.carName}</span>
                  </div>
                </Table.Cell>

                <Table.Cell>{car.carType.toUpperCase()}</Table.Cell>
                <Table.Cell>${car.dailyRentPrice}</Table.Cell>
                <Table.Cell>{car.seatCapacity}</Table.Cell>
                <Table.Cell>{car.pickupLocation}</Table.Cell>
                <Table.Cell>
                  <Chip
                    color={statusColorMap[car.availabilityStatus]}
                    size="sm"
                    variant="soft"
                  >
                    {car.availabilityStatus}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <EditCar carId={car._id} carData={car} />
                    <DeleteCar carId={car._id} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
