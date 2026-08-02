"use client";

import { Button, Modal, toast } from "@heroui/react";
import { FcCancel } from "react-icons/fc";
// Replace with the actual path to your Button component
import { deleteBooking } from "@/app/lib/datafetch";
import { useRouter } from "next/navigation";

export default function CancelBtn({ bookingId }) {
  const router = useRouter();
  const cancelBooking = (bookingId) => {
    // Implement the logic to cancel the booking using the bookingId
    // console.log("Cancel booking with ID:", bookingId);
    deleteBooking(bookingId)
      .then((response) => {
        toast.success("Booking canceled successfully:", response);

        // Optionally, you can refresh the page or update the state to reflect the cancellation
        router.refresh();
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        toast.error("Error canceling booking:", error);
      });
  };

  return (
    <Modal size="sm">
      <Button variant="secondary">
        <FcCancel className="size-5" />
        Cancel Booking
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-red-500">
                Cancel Booking
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" slot="close">
                Close
              </Button>
              <Button
                variant="danger-soft"
                size="lg"
                slot="close"
                onPress={() => cancelBooking(bookingId)}
              >
                <FcCancel className="size-5" />
                Cancel Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
