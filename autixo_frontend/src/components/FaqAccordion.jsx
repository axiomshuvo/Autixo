"use client";

import { faqItems } from "@/app/lib/data";
import { Accordion, AccordionItem, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
} from "react-icons/hi2";

const faqIconMap = {
  booking: {
    icon: HiOutlineClock,
    label: "Booking",
  },
  pickup: {
    icon: HiOutlineMapPin,
    label: "Pickup",
  },
  support: {
    icon: HiOutlineChatBubbleLeftRight,
    label: "Support",
  },
};

export default function FaqAccordion() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-border/70 bg-linear-to-br from-background via-background to-surface/70 p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
          <div className="mb-10 text-center">
            <Chip
              color="primary"
              variant="flat"
              startContent={<HiOutlineQuestionMarkCircle className="h-4 w-4" />}
              className="mb-5"
            >
              Support & booking
            </Chip>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Everything you need to know about booking, pickup, and support —
              all in one polished place.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Card className="overflow-hidden border border-border/70 bg-background/90 shadow-none">
              <Card.Content className="p-2 sm:p-4">
                <Accordion
                  variant="light"
                  className="gap-2 px-0"
                  itemClasses={{
                    base: "group rounded-2xl border border-border/70 bg-background/70 px-4 py-3 shadow-sm transition-all duration-300 data-[open=true]:border-accent/40 data-[open=true]:bg-accent/10 data-[open=true]:shadow-md",
                    trigger: "rounded-2xl py-3",
                    title: "text-base font-semibold text-foreground",
                    content: "pb-3 pt-1 text-sm leading-7 text-muted",
                    indicator:
                      "text-accent transition-transform duration-300 group-data-[open=true]:rotate-180",
                  }}
                >
                  {faqItems.map((item) => {
                    const config = faqIconMap[item.key] ?? faqIconMap.support;
                    const Icon = config.icon;

                    return (
                      <AccordionItem
                        key={item.key}
                        aria-label={item.title}
                        title={
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>{item.title}</span>
                          </div>
                        }
                      >
                        <div className="rounded-xl border border-border/60 bg-surface/70 p-4 text-sm leading-7 text-muted sm:p-5">
                          {item.content}
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card.Content>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="border border-border/70 bg-linear-to-br from-accent/10 via-background to-surface/70 shadow-none">
                <Card.Content className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-accent shadow-sm">
                    <HiOutlineSparkles className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      Still have questions?
                    </h3>
                    <p className="text-sm leading-7 text-muted">
                      Our team is ready to help with bookings, pickup changes,
                      or anything else you need before or during your trip.
                    </p>
                  </div>
                  <Button
                    as={Link}
                    href="/contact"
                    color="primary"
                    className="w-full justify-center font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      Contact support
                      <HiOutlineArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Card.Content>
              </Card>

              <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                <div className="space-y-3">
                  {[
                    "Instant booking confirmation",
                    "Flexible pickup and return options",
                    "24/7 support for every trip",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/10 text-success">
                        <HiOutlineSparkles className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
