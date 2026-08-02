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

const transmissionOptions = [
  { id: "Automatic", label: "Automatic" },
  { id: "Manual", label: "Manual" },
  { id: "CVT", label: "CVT" },
];

const fuelTypeOptions = [
  { id: "Petrol", label: "Petrol" },
  { id: "Diesel", label: "Diesel" },
  { id: "Hybrid", label: "Hybrid" },
  { id: "Electric", label: "Electric" },
];

const availabilityOptions = [
  { id: "Available", label: "Available" },
  { id: "Unavailable", label: "Unavailable" },
];

export default function EditCar({ carId, carData }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    carName: carData?.carName || "",
    dailyRentPrice: carData?.dailyRentPrice || "",
    carType: carData?.carType || "",
    seatCapacity: carData?.seatCapacity || "",
    pickupLocation: carData?.pickupLocation || "",
    availabilityStatus: carData?.availabilityStatus || "Available",
    transmission: carData?.transmission || "Automatic",
    fuelType: carData?.fuelType || "Petrol",
    reviews: carData?.reviews || "0",
    bookingCount: carData?.bookingCount || "0",
    imageUrl: carData?.imageUrl || "",
    images: Array.isArray(carData?.images) ? carData.images.join(", ") : "",
    features: Array.isArray(carData?.features)
      ? carData.features.join(", ")
      : "",
    description: carData?.description || "",
  });

  const handleFieldChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const getSelectedKeys = (value) => (value ? new Set([value]) : new Set());

  const handleSelectChange = (field) => (keys) => {
    const selectedValue =
      typeof keys === "string" ? keys : (Array.from(keys ?? [])[0] ?? "");
    setFormValues((prev) => ({ ...prev, [field]: selectedValue }));
  };

  const normalizeList = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleCarUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...formValues,
      dailyRentPrice: Number(formValues.dailyRentPrice || 0),
      seatCapacity: Number(formValues.seatCapacity || 0),
      reviews: Number(formValues.reviews || 0),
      bookingCount: Number(formValues.bookingCount || 0),
      features: normalizeList(formValues.features),
      images:
        normalizeList(formValues.images).length > 0
          ? normalizeList(formValues.images)
          : formValues.imageUrl
            ? [formValues.imageUrl]
            : [],
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
          <Modal.Dialog className="max-w-5xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Car</Modal.Heading>
              <p className="text-sm text-default-500">
                Update your vehicle information with the same structured fields
                as the add-car experience.
              </p>
            </Modal.Header>

            <Modal.Body>
              <Form
                onSubmit={handleCarUpdate}
                validationBehavior="native"
                className="space-y-6"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField isRequired name="carName">
                    <Label>Car Name</Label>
                    <Input
                      value={formValues.carName}
                      onChange={handleFieldChange("carName")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField isRequired name="dailyRentPrice">
                    <Label>Daily Rent Price</Label>
                    <Input
                      type="number"
                      value={formValues.dailyRentPrice}
                      onChange={handleFieldChange("dailyRentPrice")}
                    />
                    <FieldError />
                  </TextField>

                  <Select
                    name="carType"
                    selectedKeys={getSelectedKeys(formValues.carType)}
                    onSelectionChange={handleSelectChange("carType")}
                  >
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

                  <TextField isRequired name="seatCapacity">
                    <Label>Seat Capacity</Label>
                    <Input
                      type="number"
                      value={formValues.seatCapacity}
                      onChange={handleFieldChange("seatCapacity")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField isRequired name="pickupLocation">
                    <Label>Pickup Location</Label>
                    <Input
                      value={formValues.pickupLocation}
                      onChange={handleFieldChange("pickupLocation")}
                    />
                    <FieldError />
                  </TextField>

                  <Select
                    name="availabilityStatus"
                    selectedKeys={getSelectedKeys(
                      formValues.availabilityStatus,
                    )}
                    onSelectionChange={handleSelectChange("availabilityStatus")}
                  >
                    <Label>Availability</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {availabilityOptions.map((option) => (
                          <ListBox.Item id={option.id} key={option.id}>
                            {option.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    name="transmission"
                    selectedKeys={getSelectedKeys(formValues.transmission)}
                    onSelectionChange={handleSelectChange("transmission")}
                  >
                    <Label>Transmission</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {transmissionOptions.map((item) => (
                          <ListBox.Item key={item.id} id={item.id}>
                            {item.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    name="fuelType"
                    selectedKeys={getSelectedKeys(formValues.fuelType)}
                    onSelectionChange={handleSelectChange("fuelType")}
                  >
                    <Label>Fuel Type</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {fuelTypeOptions.map((item) => (
                          <ListBox.Item key={item.id} id={item.id}>
                            {item.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <TextField name="reviews">
                    <Label>Reviews</Label>
                    <Input
                      type="number"
                      value={formValues.reviews}
                      onChange={handleFieldChange("reviews")}
                    />
                  </TextField>

                  <TextField name="bookingCount">
                    <Label>Bookings</Label>
                    <Input
                      type="number"
                      value={formValues.bookingCount}
                      onChange={handleFieldChange("bookingCount")}
                    />
                  </TextField>
                </div>

                <div className="space-y-4">
                  <TextField name="imageUrl">
                    <Label>Main Image URL</Label>
                    <Input
                      type="url"
                      value={formValues.imageUrl}
                      onChange={handleFieldChange("imageUrl")}
                    />
                  </TextField>

                  <TextField name="images">
                    <Label>Gallery Images</Label>
                    <Input
                      value={formValues.images}
                      onChange={handleFieldChange("images")}
                      placeholder="Paste comma-separated image URLs"
                    />
                  </TextField>

                  <TextField name="features">
                    <Label>Features</Label>
                    <Input
                      value={formValues.features}
                      onChange={handleFieldChange("features")}
                      placeholder="Add comma-separated features"
                    />
                  </TextField>

                  <TextField isRequired name="description">
                    <Label>Description</Label>
                    <TextArea
                      className="min-h-32"
                      value={formValues.description}
                      onChange={handleFieldChange("description")}
                    />
                    <FieldError />
                  </TextField>
                </div>

                <div className="flex justify-end gap-3">
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
