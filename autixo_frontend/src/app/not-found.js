"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { TbCarOff, TbRouteOff } from "react-icons/tb";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="relative flex max-w-lg flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mb-8">
          <div className="flex size-28 items-center justify-center rounded-3xl bg-accent/10 ring-1 ring-accent/20">
            <TbCarOff className="size-14 text-accent" />
          </div>
          <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-xl bg-background shadow-lg ring-1 ring-border">
            <TbRouteOff className="size-5 text-danger" />
          </div>
        </div>
        <h1 className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-[120px] leading-none font-bold tracking-tighter text-transparent select-none">
          404
        </h1>
        <h2 className="-mt-3 mb-3 text-2xl font-semibold text-foreground">
          Wrong Turn!
        </h2>
        <p className="mb-8 max-w-sm text-base leading-relaxed text-muted">
          Looks like you took a detour onto a road that doesn&apos;t exist. Let&apos;s get
          you back on the highway.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            className="bg-accent text-accent-foreground"
            onPress={() => router.push("/")}
            size="lg"
          >
            Back to Home
          </Button>
          <Button
            onPress={() => router.push("/explore-cars")}
            size="lg"
            variant="bordered"
          >
            Explore Cars
          </Button>
        </div>
        <div aria-hidden="true" className="mt-12 flex items-center gap-2 opacity-20">
          <span className="size-2 rounded-full bg-accent" />
          <span className="h-px w-8 bg-accent" />
          <span className="size-2 rounded-full bg-accent" />
          <span className="h-px w-16 bg-accent" />
          <span className="size-3 rounded-full bg-accent" />
        </div>
      </div>
    </main>
  );
}
