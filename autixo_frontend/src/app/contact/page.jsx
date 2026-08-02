"use client";

import { contactItems, contactPageContent } from "@/app/lib/data";
import { Button, Card, toast } from "@heroui/react";
import { FiSend } from "react-icons/fi";

export default function ContactPage() {
  const { hero, form, info, businessHoursTitle, businessHours, note } =
    contactPageContent;

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success(contactPageContent.successMessage);
  };

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
          <h1 className="text-5xl md:text-7xl font-bold mb-5">{hero.title}</h1>
          <p className="max-w-2xl mx-auto text-lg text-accent-foreground/80">
            {hero.description}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{form.heading}</h2>
            <p className="text-muted mb-8">{form.description}</p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="min-h-32 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="bg-accent text-accent-foreground w-full sm:w-auto self-start"
                startContent={<FiSend className="size-4" />}
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{info.heading}</h2>
            <p className="text-muted mb-8">{info.description}</p>

            <ul className="flex flex-col gap-5 mb-10">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-4 text-muted hover:text-foreground transition-colors"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface-secondary text-accent">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-base">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <Card
              className="border border-border bg-surface-secondary"
              shadow="none"
            >
              <Card.Content className="p-6">
                <h3 className="font-semibold mb-2">{businessHoursTitle}</h3>
                <div className="flex flex-col gap-1 text-sm text-muted">
                  {businessHours.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className="text-sm text-muted mt-4">{note}</p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
