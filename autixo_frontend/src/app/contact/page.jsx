import { Button, Card, TextArea, TextField } from "@heroui/react";
import { FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const contactItems = [
  {
    icon: FiPhone,
    label: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: HiOutlineMail,
    label: "support@autixo.com",
    href: "mailto:support@autixo.com",
  },
  {
    icon: FiMapPin,
    label: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-accent to-[oklch(24%_0.12_292.1)] py-24 text-accent-foreground">
        <div aria-hidden className="absolute -top-24 -right-16 size-96 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-28 -left-20 size-80 rounded-full bg-black/20 blur-3xl" />
        <div className="container mx-auto relative z-10 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-5">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-lg text-accent-foreground/80">
            Have a question, need help with a booking, or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
            <p className="text-muted mb-8">
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <form className="flex flex-col gap-5">
              <TextField name="name" label="Full Name" isRequired placeholder="John Doe" />
              <TextField name="email" label="Email Address" type="email" isRequired placeholder="john@example.com" />
              <TextField name="subject" label="Subject" isRequired placeholder="How can we help?" />
              <TextArea name="message" label="Message" isRequired placeholder="Tell us what's on your mind..." minRows={5} />

              <Button type="submit" size="lg" className="bg-accent text-accent-foreground w-full sm:w-auto self-start" startContent={<FiSend className="size-4" />}>
                Send Message
              </Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
            <p className="text-muted mb-8">
              Prefer to reach out directly? Here's how to find us.
            </p>

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

            <Card className="border border-border bg-surface-secondary" shadow="none">
              <Card.Content className="p-6">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <div className="flex flex-col gap-1 text-sm text-muted">
                  <span>Monday – Friday: 9:00 AM – 8:00 PM</span>
                  <span>Saturday: 10:00 AM – 6:00 PM</span>
                  <span>Sunday: Closed</span>
                </div>
                <p className="text-sm text-muted mt-4">
                  24/7 roadside assistance is always available for active rentals.
                </p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
