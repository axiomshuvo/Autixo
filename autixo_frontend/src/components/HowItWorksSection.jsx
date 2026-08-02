import { howItWorksSteps } from "@/app/lib/data";

export default function HowItWorksSection() {
  return (
    <section className="container mx-auto my-20">
      <div className="rounded-[2rem] border border-border/70 bg-linear-to-br from-accent/10 via-background to-background p-8 shadow-sm sm:p-10 lg:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Rent a car in just a few simple steps
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border/70 bg-background/80 p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
