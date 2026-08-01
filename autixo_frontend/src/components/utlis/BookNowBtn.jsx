"use client";
import { authClient } from "@/app/lib/auth-client";
import { addBooking } from "@/app/lib/datafetch";
import { Button, Modal, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookNowBtn({ availability, carId }) {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsDriver, setNeedsDriver] = useState("yes");
  const [specialNote, setSpecialNote] = useState("");

  const isAvailable =
    String(availability ?? "")
      .trim()
      .toLowerCase() === "available";

  const openBookingModal = () => {
    if (!userId) {
      toast.warning("Please sign in before booking this car.");
      return;
    }

    if (!isAvailable) return;

    setIsOpen(true);
  };

  const submitBooking = async () => {
    if (!userId) {
      toast.warning("Please sign in before booking this car.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addBooking({
        userId,
        carId,
        bookingDate: new Date().toISOString(),
        driverNeeded: needsDriver === "yes",
        specialNote: specialNote.trim(),
      });

      toast.success("Booking request sent successfully.");
      setSpecialNote("");
      setNeedsDriver("yes");
      setIsOpen(false);
      router.refresh();
      // router.push("/dashboard");
    } catch (error) {
      toast.danger(error?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="lg"
        className="w-full font-semibold"
        onPress={openBookingModal}
        isDisabled={!isAvailable}
      >
        {isAvailable ? "Book Now" : "Unavailable"}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <div className="space-y-1">
                  <Modal.Heading className="text-xl font-semibold">
                    Reserve This Car
                  </Modal.Heading>
                  <p className="text-sm text-default-500">
                    Share a few details so the owner can prepare for your trip.
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Driver needed?
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={needsDriver === "yes" ? "primary" : "ghost "}
                      onPress={() => setNeedsDriver("yes")}
                    >
                      Yes
                    </Button>

                    <Button
                      type="button"
                      variant={needsDriver === "no" ? "primary" : "ghost "}
                      onPress={() => setNeedsDriver("no")}
                    >
                      No
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Special note
                  </p>

                  <textarea
                    className="min-h-28 w-full rounded-xl border border-default-200 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="Any pickup request or extra preference?"
                    value={specialNote}
                    onChange={(event) => setSpecialNote(event.target.value)}
                  />
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="light" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>

                <Button
                  color="primary"
                  isLoading={isSubmitting}
                  onPress={submitBooking}
                >
                  Confirm Booking
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
