"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function CtaButtons() {
  return (
    <div className="flex justify-center gap-4">
      <Button as={Link} href="/explore-cars" size="lg" variant="danger">
        Explore Cars
      </Button>
      <Button as={Link} href="/contact" size="lg" variant="bordered" className="border-accent-foreground/30 text-accent-foreground">
        Contact Us
      </Button>
    </div>
  );
}
