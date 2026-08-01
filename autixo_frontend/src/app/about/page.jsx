import { carStats, ourValues } from "@/app/lib/data";
import { Card, Separator } from "@heroui/react";
import CtaButtons from "./CtaButtons";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-accent to-[oklch(24%_0.12_292.1)] py-24 text-accent-foreground">
        <div
          aria-hidden
          className="absolute -top-24 -right-16 size-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-28 -left-20 size-80 rounded-full bg-black/20 blur-3xl"
        />
        <div className="container mx-auto relative z-10 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-5">About Autixo</h1>
          <p className="max-w-2xl mx-auto text-lg text-accent-foreground/80">
            We're on a mission to make car rental simple, transparent, and
            accessible for everyone — whether it's a quick city trip or a
            cross-country adventure.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-5">Our Story</h2>
            <p className="text-muted leading-relaxed mb-4">
              Autixo started with a simple idea: renting a car should be as easy
              as ordering a coffee. Tired of clunky booking systems, hidden
              fees, and inconsistent service, we set out to build a platform
              that puts the renter first.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Since launching, we've grown to serve thousands of customers
              across 60+ pickup locations, with a fleet of over 500 verified
              vehicles — from compact city cars to premium SUVs.
            </p>
            <p className="text-muted leading-relaxed">
              Every car on Autixo is vetted, every price is upfront, and every
              booking is confirmed instantly. No paperwork, no waiting — just
              pick your car and go.
            </p>
          </div>

          <Card className="border border-border bg-surface p-8" shadow="none">
            <div className="grid grid-cols-2 gap-6">
              {carStats.slice(0, 4).map((stat) => (
                <div key={stat.id} className="text-center">
                  <h3 className="text-4xl font-bold text-accent">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted mt-1">{stat.title}</p>
                </div>
              ))}
            </div>
            <Separator className="my-8" />
            <blockquote className="text-center text-lg italic text-muted">
              "Autixo turned what used to be a stressful rental process into a
              five-minute experience. I'll never go back to traditional
              agencies."
            </blockquote>
            <p className="text-center text-sm text-muted mt-3">
              — Sarah M., loyal customer since 2024
            </p>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-secondary py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            What We Stand For
          </h2>
          <p className="text-center text-muted mb-14 max-w-xl mx-auto">
            These principles guide every decision we make — from the cars we
            list to the support we provide.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ourValues.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="border border-border bg-surface text-center"
                shadow="none"
              >
                <Card.Content className="p-6 gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent mx-auto">
                    <Icon className="size-6" />
                  </span>
                  <Card.Title className="text-lg font-semibold text-foreground">
                    {title}
                  </Card.Title>
                  <Card.Description className="text-sm text-muted">
                    {description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Card
          className="border border-border bg-linear-to-br from-accent to-[oklch(24%_0.12_292.1)]"
          shadow="none"
        >
          <Card.Content className="p-12 md:p-16 text-accent-foreground gap-5">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to hit the road?
            </h2>
            <p className="max-w-lg mx-auto text-lg text-accent-foreground/80 mb-8">
              Browse our fleet and find the perfect car for your next journey.
              Booking takes less than a minute.
            </p>
            <CtaButtons />
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
