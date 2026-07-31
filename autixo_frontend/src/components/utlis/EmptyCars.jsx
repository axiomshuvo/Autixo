import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { FcAutomotive } from "react-icons/fc";

export default function EmptyCars() {
  return (
    <div className="w-full rounded-2xl border border-default-200 bg-default-50 p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
          <FcAutomotive className="text-7xl text-primary" />
        </div>

        <h2 className="text-3xl font-bold text-foreground">
          No Cars Added Yet
        </h2>

        <p className="mt-3 max-w-2xl text-default-500">
          It looks like you haven't added any cars to your garage yet. Start by
          adding your first car and make it available for booking.
        </p>

        <div className="mt-8">
          {/* <Link href="/add-car">
            <Button size="lg">Add Your First Car</Button>
          </Link> */}
          <Link
            href="/add-car"
            className={buttonVariants({ color: "primary", size: "lg" })}
          >
            Add Your First Car
          </Link>
        </div>
      </div>
    </div>
  );
}
