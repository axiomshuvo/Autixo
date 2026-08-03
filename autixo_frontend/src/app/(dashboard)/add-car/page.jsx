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

const initialValues = {
  carName: "",
  dailyRentPrice: "",
  carType: "",
  seatCapacity: "",
  pickupLocation: "",
  availabilityStatus: "Available",
  transmission: "Automatic",
  fuelType: "Petrol",
  reviews: "0",
  bookingCount: "0",
  imageUrl: "",
  images: "",
  features: "",
  description: "",
};

export default function AddCardPage() {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (field) => (event) => {
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

  const getSessionUserId = (user) =>
    user?.id || user?._id || user?.userId || user?.sub || user?.email || null;

  const addCarHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const features = normalizeList(formValues.features);
      const galleryImages = normalizeList(formValues.images);
      const ownerId = getSessionUserId(session?.user);

      const payload = {
        ...formValues,
        ownerId,
        userId: ownerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dailyRentPrice: Number(formValues.dailyRentPrice || 0),
        seatCapacity: Number(formValues.seatCapacity || 0),
        reviews: Number(formValues.reviews || 0),
        bookingCount: Number(formValues.bookingCount || 0),
        availabilityStatus: formValues.availabilityStatus || "Available",
        transmission: formValues.transmission || "Automatic",
        fuelType: formValues.fuelType || "Petrol",
        features,
        images:
          galleryImages.length > 0
            ? galleryImages
            : formValues.imageUrl
              ? [formValues.imageUrl]
              : [],
      };

      await createCar(payload);
      toast.success("Car added successfully!");
      setFormValues(initialValues);
      e.target.reset();
    } catch (error) {
      console.error("Error adding car:", error);
      toast.danger(error.message || "Error adding car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewFeatures = normalizeList(formValues.features);
  const previewGallery = normalizeList(formValues.images);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-linear-to-br from-accent/10 via-background to-background p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Listing studio
              </p>
              <h1 className="text-3xl font-semibold text-foreground">
                Add a new car to the fleet
              </h1>
              <p className="max-w-2xl text-sm text-muted">
                Create a polished rental listing with the same structure used
                throughout the app, including pricing, availability, media, and
                feature highlights.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-muted">
              Tip: add a main image and a few gallery links to make the listing
              feel complete.
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-3xl border border-default-200 bg-background p-5 shadow-sm sm:p-8">
            <Form
              onSubmit={addCarHandler}
              className="space-y-8"
              validationBehavior="native"
            >
              <Fieldset className="space-y-4">
                <Fieldset.Legend className="text-sm font-medium text-foreground">
                  Essentials
                </Fieldset.Legend>
                <Fieldset.Group className="grid gap-5 md:grid-cols-2">
                  <TextField isRequired className="space-y-1.5" name="carName">
                    <Label>Car Name</Label>
                    <Input
                      placeholder="Enter car name"
                      value={formValues.carName}
                      onChange={handleTextChange("carName")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    isRequired
                    className="space-y-1.5"
                    name="dailyRentPrice"
                  >
                    <Label>Daily Rent Price</Label>
                    <Input
                      placeholder="Enter price"
                      type="number"
                      min="0"
                      value={formValues.dailyRentPrice}
                      onChange={handleTextChange("dailyRentPrice")}
                    />
                    <FieldError />
                  </TextField>

                  <Select
                    isRequired
                    className="space-y-1.5"
                    name="carType"
                    selectedKeys={getSelectedKeys(formValues.carType)}
                    onSelectionChange={handleSelectChange("carType")}
                  >
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
                      value={formValues.seatCapacity}
                      onChange={handleTextChange("seatCapacity")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    isRequired
                    className="space-y-1.5"
                    name="pickupLocation"
                  >
                    <Label>Pickup Location</Label>
                    <Input
                      placeholder="Enter location"
                      value={formValues.pickupLocation}
                      onChange={handleTextChange("pickupLocation")}
                    />
                    <FieldError />
                  </TextField>
                </Fieldset.Group>
              </Fieldset>

              <Fieldset className="space-y-4">
                <Fieldset.Legend className="text-sm font-medium text-foreground">
                  Availability & specs
                </Fieldset.Legend>
                <Fieldset.Group className="grid gap-5 md:grid-cols-2">
                  <Select
                    isRequired
                    name="availabilityStatus"
                    selectedKeys={getSelectedKeys(
                      formValues.availabilityStatus,
                    )}
                    onSelectionChange={handleSelectChange("availabilityStatus")}
                  >
                    <Label>Availability</Label>
                    <Select.Trigger>
                      <Select.Value placeholder="Select availability" />
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
                    isRequired
                    name="transmission"
                    selectedKeys={getSelectedKeys(formValues.transmission)}
                    onSelectionChange={handleSelectChange("transmission")}
                  >
                    <Label>Transmission</Label>
                    <Select.Trigger>
                      <Select.Value placeholder="Select transmission" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {transmissionOptions.map((option) => (
                          <ListBox.Item id={option.id} key={option.id}>
                            {option.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    isRequired
                    name="fuelType"
                    selectedKeys={getSelectedKeys(formValues.fuelType)}
                    onSelectionChange={handleSelectChange("fuelType")}
                  >
                    <Label>Fuel Type</Label>
                    <Select.Trigger>
                      <Select.Value placeholder="Select fuel type" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {fuelTypeOptions.map((option) => (
                          <ListBox.Item id={option.id} key={option.id}>
                            {option.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <TextField className="space-y-1.5" name="reviews">
                    <Label>Reviews</Label>
                    <Input
                      placeholder="Enter review count"
                      type="number"
                      min="0"
                      value={formValues.reviews}
                      onChange={handleTextChange("reviews")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField className="space-y-1.5" name="bookingCount">
                    <Label>Bookings</Label>
                    <Input
                      placeholder="Enter booking count"
                      type="number"
                      min="0"
                      value={formValues.bookingCount}
                      onChange={handleTextChange("bookingCount")}
                    />
                    <FieldError />
                  </TextField>
                </Fieldset.Group>
              </Fieldset>

              <Fieldset className="space-y-4">
                <Fieldset.Legend className="text-sm font-medium text-foreground">
                  Media & story
                </Fieldset.Legend>
                <Fieldset.Group className="space-y-5">
                  <TextField className="space-y-1.5" name="imageUrl" type="url">
                    <Label>Main Image URL</Label>
                    <Input
                      placeholder="Enter the primary image URL"
                      type="url"
                      value={formValues.imageUrl}
                      onChange={handleTextChange("imageUrl")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField className="space-y-1.5" name="images">
                    <Label>Gallery Images</Label>
                    <Input
                      placeholder="Paste comma-separated image URLs"
                      value={formValues.images}
                      onChange={handleTextChange("images")}
                    />
                    <FieldError />
                  </TextField>

                  <TextField className="space-y-1.5" name="features">
                    <Label>Features</Label>
                    <Input
                      placeholder="Add comma-separated features"
                      value={formValues.features}
                      onChange={handleTextChange("features")}
                    />
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
                      value={formValues.description}
                      onChange={handleTextChange("description")}
                    />
                    <FieldError />
                  </TextField>
                </Fieldset.Group>
              </Fieldset>

              <Fieldset.Actions className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  The listing will be saved with the richer metadata used across
                  the marketplace experience.
                </p>
                <Button
                  className="min-w-36 bg-accent px-8 text-accent-foreground"
                  type="submit"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Add Car"}
                </Button>
              </Fieldset.Actions>
            </Form>
          </Card>

          <Card className="rounded-3xl border border-default-200 bg-background p-5 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Preview
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  {formValues.carName || "Your next listing"}
                </h2>
                <p className="text-sm text-muted">
                  {formValues.description ||
                    "Add a description to help guests understand what makes this car special."}
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Daily rate</span>
                  <span className="text-xl font-semibold text-accent">
                    ${formValues.dailyRentPrice || 0}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-foreground">Type</p>
                    <p>{formValues.carType || "Crossover"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Seats</p>
                    <p>{formValues.seatCapacity || "5"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pickup</p>
                    <p>{formValues.pickupLocation || "Your city"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Availability</p>
                    <p>{formValues.availabilityStatus || "Available"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Highlights
                </p>
                <div className="flex flex-wrap gap-2">
                  {previewFeatures.length > 0 ? (
                    previewFeatures.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted"
                      >
                        {feature}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted">
                      Add a few features to make the listing stand out.
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Gallery</p>
                <div className="space-y-2">
                  {previewGallery.length > 0 ? (
                    previewGallery.map((image) => (
                      <p key={image} className="truncate text-sm text-muted">
                        {image}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted">
                      Add gallery URLs to show multiple views of the car.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
