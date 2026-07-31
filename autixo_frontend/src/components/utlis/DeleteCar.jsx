"use client";

import { deleteCar } from "@/app/lib/datafetch";
import { Button, Modal, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCar({ carId }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCar(carId);

      toast.success("The car has been deleted successfully.");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.warning("Delete failed", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" size="sm" onPress={() => setOpen(true)}>
        Delete
      </Button>

      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading className="text-2xl text-red-500">
                  Delete Car
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                Are you sure you want to delete this car? This action cannot be
                undone.
              </Modal.Body>

              <Modal.Footer>
                <Button variant="light" onPress={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button
                  variant="danger"
                  size="lg"
                  isLoading={loading}
                  onPress={handleDelete}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
