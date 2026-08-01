"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const badgeList = [
  { id: "verified-host", label: "Verified Host" },
  { id: "car-enthusiast", label: "Car Enthusiast" },
  { id: "traveler", label: "Traveler" },
  { id: "road-trip-lover", label: "Road Trip Lover" },
  { id: "luxury-cars", label: "Luxury Cars" },
  { id: "top-rated", label: "Top Rated" },
  { id: "friendly", label: "Friendly" },
  { id: "quick-responder", label: "Quick Responder" },
  { id: "safe-driver", label: "Safe Driver" },
  { id: "premium-service", label: "Premium Service" },
  { id: "reliable", label: "Reliable" },
  { id: "adventure-seeker", label: "Adventure Seeker" },
];

const highlightList = [
  { id: "Luxury Cars", label: "Luxury Cars" },
  { id: "Exotic Cars", label: "Exotic Cars" },
  { id: "Sports Cars", label: "Sports Cars" },
  { id: "Classic Cars", label: "Classic Cars" },
  { id: "SUVs", label: "SUVs" },
  { id: "Convertibles", label: "Convertibles" },
];

const languageOptions = [
  { id: "bn", label: "Bengali" },
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "de", label: "German" },
  { id: "zh", label: "Chinese" },
  { id: "ja", label: "Japanese" },
  { id: "ko", label: "Korean" },
  { id: "ar", label: "Arabic" },
  { id: "hi", label: "Hindi" },
];

const tagslist = [
  { id: "responsive", label: "Responsive" },
  { id: "detail-oriented", label: "Detail-oriented" },
  { id: "friendly", label: "Friendly" },
  { id: "flexible", label: "Flexible" },
  { id: "professional", label: "Professional" },
  { id: "reliable", label: "Reliable" },
  { id: "punctual", label: "Punctual" },
  { id: "trustworthy", label: "Trustworthy" },
  { id: "helpful", label: "Helpful" },
  { id: "respectful", label: "Respectful" },
  { id: "communicative", label: "Communicative" },
  { id: "organized", label: "Organized" },
  { id: "customer-focused", label: "Customer-focused" },
  { id: "problem-solver", label: "Problem Solver" },
  { id: "safety-first", label: "Safety First" },
  { id: "easy-to-work-with", label: "Easy to Work With" },
  { id: "well-maintained", label: "Well Maintained" },
  { id: "quick-responder", label: "Quick Responder" },
  { id: "experienced-host", label: "Experienced Host" },
  { id: "verified-host", label: "Verified Host" },
];

export default function UpdateProfile({ data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    name,
    email,
    phone,
    location,
    language,
    headline,
    about,
    badge,
    highlights,
    tags,
    image,
    _id: userId,
  } = data;

  console.log("Data received in UpdateProfile:", data);

  const normalizeSelectionValue = (value) => {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null || value === "") return [];
    return [value];
  };

  // HeroUI v3's Select `value` prop wants an array of Keys (strings), not a Set.
  const toSelectionKeys = (value) =>
    normalizeSelectionValue(value).map((item) => {
      if (typeof item === "string") return item;
      if (item?.id) return item.id;
      if (item?.label) return item.label;
      return "";
    });
  const [showPassword, setShowPassword] = useState(false);

  const [selectedBadges, setSelectedBadges] = useState(() =>
    toSelectionKeys(badge),
  );
  const [selectedHighlights, setSelectedHighlights] = useState(() =>
    toSelectionKeys(highlights),
  );
  const [selectedLanguages, setSelectedLanguages] = useState(() =>
    toSelectionKeys(language),
  );
  const [selectedTags, setSelectedTags] = useState(() => toSelectionKeys(tags));

  // Select's onChange for selectionMode="multiple" gives Key[] | null — normalize it.
  const handleSelectionChange = (setter) => (value) =>
    setter(normalizeSelectionValue(value));

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const buildSelectionPayload = (selectedKeys, options) =>
      (selectedKeys || [])
        .map((key) => options.find((item) => item.id === key))
        .filter(Boolean);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      badge: buildSelectionPayload(selectedBadges, badgeList),
      highlights: buildSelectionPayload(selectedHighlights, highlightList),
      language: buildSelectionPayload(selectedLanguages, languageOptions),
      tags: buildSelectionPayload(selectedTags, tagslist),
    };

    // if Password empty
    if (!payload.password?.trim()) {
      delete payload.password;
    }

    console.log("Payload:", payload);

    // try {
    //   const result = await updateUserDetails(userId, payload);

    //   if (result.success) {
    //     toast.success("Profile updated successfully!");
    //     setOpen(false);
    //     router.refresh();
    //   }
    //   console.log("Success");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to update profile.");
    // }
  };

  return (
    <Form id="updateProfileForm" onSubmit={handleProfileUpdate}>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Button variant="primary" size="lg" onPress={() => setOpen(true)}>
          Update Profile
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className=" max-w-xl   md:max-w-4xl  lg:max-w-7xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <div className="space-y-1">
                  <Modal.Heading className="text-xl font-semibold">
                    Update Profile
                  </Modal.Heading>
                  <p className="text-sm text-default-500">
                    Update the information displayed on your profile.
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="space-y-5">
                <div className="grid gap-4 md:grid-cols-4">
                  <TextField isRequired name="name" defaultValue={name}>
                    <Label>Name</Label>
                    <Input form="updateProfileForm" />
                    <FieldError />
                  </TextField>
                  <TextField isRequired name="email" defaultValue={email}>
                    <Label>Email</Label>
                    <Input type="email" form="updateProfileForm" />
                    <FieldError />
                  </TextField>
                  <TextField name="password" label="Update Password">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        form="updateProfileForm"
                        className=" w-full pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-muted"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <HiEyeSlash className="size-5" />
                        ) : (
                          <HiEye className="size-5" />
                        )}
                      </button>
                    </div>
                    <FieldError />
                    <Description>
                      Leave this blank if you don't want to change your
                      password.
                    </Description>
                  </TextField>

                  <TextField name="phone" defaultValue={phone}>
                    <Label>Phone</Label>
                    <Input form="updateProfileForm" />
                    <FieldError />
                  </TextField>
                </div>
                <div className="grid gap-4 md:grid-cols-5">
                  <Select
                    name="badge"
                    placeholder="Select badge"
                    selectionMode="multiple"
                    value={selectedBadges}
                    onChange={handleSelectionChange(setSelectedBadges)}
                  >
                    <Label>Badge</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {badgeList.map((tag) => (
                          <ListBox.Item
                            key={tag.id}
                            id={tag.id}
                            textValue={tag.label}
                          >
                            {tag.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    name="highlights"
                    placeholder="Select highlights"
                    selectionMode="multiple"
                    value={selectedHighlights}
                    onChange={handleSelectionChange(setSelectedHighlights)}
                  >
                    <Label>Highlights</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {highlightList.map((tag) => (
                          <ListBox.Item
                            key={tag.id}
                            id={tag.id}
                            textValue={tag.label}
                          >
                            {tag.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    name="language"
                    placeholder="Select language"
                    selectionMode="multiple"
                    value={selectedLanguages}
                    onChange={handleSelectionChange(setSelectedLanguages)}
                  >
                    <Label>Language</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {languageOptions.map((item) => (
                          <ListBox.Item
                            key={item.id}
                            id={item.id}
                            textValue={item.label}
                          >
                            {item.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Select
                    name="tags"
                    placeholder="Select tags"
                    selectionMode="multiple"
                    value={selectedTags}
                    onChange={handleSelectionChange(setSelectedTags)}
                  >
                    <Label>Tags</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {tagslist.map((item) => (
                          <ListBox.Item
                            key={item.id}
                            id={item.id}
                            textValue={item.label}
                          >
                            {item.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <TextField
                    name="location"
                    placeholder="Enter your location"
                    defaultValue={location}
                  >
                    <Label>Location</Label>
                    <Input form="updateProfileForm" />
                    <FieldError />
                  </TextField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField name="headline" defaultValue={headline}>
                    <Label>headline</Label>
                    <Input form="updateProfileForm" />
                    <Description>
                      Write a tagline or headline that describes you
                    </Description>
                    <FieldError />
                  </TextField>

                  <TextField
                    name="image"
                    placeholder="Enter image URL"
                    defaultValue={image}
                  >
                    <Label>Image</Label>
                    <Input form="updateProfileForm" />
                    <Description>Insert a profile image url</Description>
                    <FieldError />
                  </TextField>
                </div>
                <div className="grid gap-4 md:grid-cols-1">
                  <TextField name="about" defaultValue={about}>
                    <Label>About</Label>
                    <TextArea
                      className="h-32"
                      placeholder="Tell us about yourself..."
                      form="updateProfileForm"
                    />
                    <Description>
                      Write a brief description about yourself. This will be
                      displayed on your profile for others to see.
                    </Description>
                    <FieldError />
                  </TextField>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="warning" slot="close">
                  Cancel
                </Button>

                <Button variant="danger" type="submit" form="updateProfileForm">
                  Update Profile
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </Form>
  );
}
