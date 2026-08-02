import { whyChooseUsFeatures } from "@/app/lib/data";

export default function WhyChooseUsSection() {
  return (
    <section className="container mx-auto my-20 rounded-[2rem] border border-border/70 bg-background/80 p-8 shadow-sm sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Why choose us
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            A smoother way to rent your next ride
          </h2>
          <p className="max-w-xl text-base text-muted">
            From quick weekend escapes to business travel, our experience makes
            every reservation feel effortless and reliable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {whyChooseUsFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/70 bg-surface p-5"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
