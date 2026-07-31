"use client";

import { updateCar } from "@/app/lib/datafetch";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function EditCar({ carId, carData }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    carName,
    dailyRentPrice,
    carType,
    seatCapacity,
    pickupLocation,
    availabilityStatus,
    imageUrl,
    description,
  } = carData;
  console.log("EditCar Component - carData:", carData);

  const handleCarUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      dailyRentPrice: Number(formData.get("dailyRentPrice")),
      seatCapacity: Number(formData.get("seatCapacity")),
    };

    try {
      await updateCar(carId, payload);
      toast.success("Car updated successfully.");
      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button color="primary" size="sm" onPress={() => setOpen(true)}>
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-4xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Car</Modal.Heading>

              <p className="text-sm text-default-500">
                Update your vehicle information.
              </p>
            </Modal.Header>

            <Modal.Body>
              <Form
                onSubmit={handleCarUpdate}
                validationBehavior="native"
                className="grid gap-5 md:grid-cols-2"
              >
                <TextField isRequired name="carName" defaultValue={carName}>
                  <Label>Car Name</Label>
                  <Input />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="dailyRentPrice"
                  defaultValue={dailyRentPrice}
                >
                  <Label>Daily Rent Price</Label>
                  <Input type="number" />
                  <FieldError />
                </TextField>

                <Select name="carType" defaultValue={[carType]}>
                  <Label>Car Type</Label>

                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {carTypeOptions.map((item) => (
                        <ListBox.Item key={item.id} id={item.id}>
                          {item.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField
                  isRequired
                  name="seatCapacity"
                  defaultValue={seatCapacity}
                >
                  <Label>Seat Capacity</Label>
                  <Input type="number" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="pickupLocation"
                  defaultValue={pickupLocation}
                >
                  <Label>Pickup Location</Label>
                  <Input />
                  <FieldError />
                </TextField>

                <Select
                  isRequired
                  name="availabilityStatus"
                  defaultValue={[availabilityStatus]}
                >
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

                <div className="md:col-span-2">
                  <TextField name="imageUrl" defaultValue={imageUrl}>
                    <Label>Image URL</Label>
                    <Input type="url" />
                  </TextField>
                </div>

                <div className="md:col-span-2">
                  <TextField
                    isRequired
                    name="description"
                    defaultValue={description}
                  >
                    <Label>Description</Label>

                    <TextArea className="min-h-32" />

                    <FieldError />
                  </TextField>
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" color="primary">
                    Update Car
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
