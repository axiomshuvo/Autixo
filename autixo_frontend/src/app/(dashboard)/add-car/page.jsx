"use client";

import { useSession } from "@/app/lib/auth-client";
import { createCar } from "@/app/lib/datafetch";
import {
  Button,
  Card,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";

const carTypeOptions = [
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV" },
  { id: "crossover", label: "Crossover" },
  { id: "hatchback", label: "Hatchback" },
  { id: "mpv", label: "MPV" },
  { id: "ev", label: "Electric (EV)" },
  { id: "luxury", label: "Luxury" },
  { id: "hybrid", label: "Hybrid" },
];

export default function AddCardPage() {
  const { data: session } = useSession();

  const addCarHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const formobject = Object.fromEntries(formdata.entries());
    const payload = {
      ...formobject,
      ownerId: session?.user?.id,
      dailyRentPrice: parseFloat(formobject.dailyRentPrice),
      seatCapacity: parseInt(formobject.seatCapacity, 10),
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await createCar(payload);
      if (response.ok) {
        toast.success("Car added successfully!");
        e.target.reset();
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to add car: ${errorData.message || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error(`Error adding car: ${error.message}`);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">
            Add New Car
          </h1>
          <p className="text-sm text-muted">
            Fill in the vehicle details to prepare a new listing.
          </p>
        </div>

        <Card className="rounded-3xl border border-default-200 bg-background p-5 shadow-sm sm:p-8">
          <Form
            onSubmit={addCarHandler}
            className="space-y-8"
            validationBehavior="native"
          >
            <Fieldset className="space-y-4">
              <Fieldset.Legend className="text-sm font-medium text-foreground">
                Car details
              </Fieldset.Legend>
              <Fieldset.Group className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <TextField isRequired className="space-y-1.5" name="carName">
                  <Label>Car Name</Label>
                  <Input placeholder="Enter car name" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  className="space-y-1.5"
                  name="dailyRentPrice"
                >
                  <Label>Daily Rent Price</Label>
                  <Input placeholder="Enter price" type="number" min="0" />
                  <FieldError />
                </TextField>

                <Select isRequired className="space-y-1.5" name="carType">
                  <Label>Car Type</Label>
                  <Select.Trigger>
                    <Select.Value placeholder="Select type" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {carTypeOptions.map((option) => (
                        <ListBox.Item id={option.id} key={option.id}>
                          {option.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  <FieldError />
                </Select>
              </Fieldset.Group>
            </Fieldset>

            <Fieldset className="space-y-4">
              <Fieldset.Legend className="text-sm font-medium text-foreground">
                Availability
              </Fieldset.Legend>
              <Fieldset.Group className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <TextField
                  isRequired
                  className="space-y-1.5"
                  name="seatCapacity"
                >
                  <Label>Seat Capacity</Label>
                  <Input
                    placeholder="Enter seat capacity"
                    type="number"
                    min="1"
                  />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  className="space-y-1.5"
                  name="pickupLocation"
                >
                  <Label>Pickup Location</Label>
                  <Input placeholder="Enter location" />
                  <FieldError />
                </TextField>

                <Select isRequired name="availabilityStatus">
                  <Label>Availability</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="available">Available</ListBox.Item>
                      <ListBox.Item id="unavailable">Unavailable</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Fieldset.Group>
            </Fieldset>

            <Fieldset className="space-y-4">
              <Fieldset.Legend className="text-sm font-medium text-foreground">
                Media and description
              </Fieldset.Legend>
              <Fieldset.Group className="space-y-5">
                <TextField className="space-y-1.5" name="imageUrl" type="url">
                  <Label>Image URL</Label>
                  <Input placeholder="Enter image URL" type="url" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  className="space-y-1.5"
                  name="description"
                >
                  <Label>Description</Label>
                  <TextArea
                    className="min-h-36"
                    placeholder="Enter description about the car..."
                  />
                  <FieldError />
                </TextField>
              </Fieldset.Group>
            </Fieldset>

            <Fieldset.Actions className="justify-end">
              <Button
                className="min-w-36 bg-accent px-8 text-accent-foreground"
                type="submit"
              >
                Add Car
              </Button>
            </Fieldset.Actions>
          </Form>
        </Card>
      </div>
    </section>
  );
}
