"use client";

import LogoImageController from "@/providers/LogoImageController";
import { Button, Separator } from "@heroui/react";
import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiX,
} from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Cars", href: "/explore-cars" },
  { label: "Add Car", href: "/add-car" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Added Cars", href: "/dashboard" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/" },
  { label: "Terms & Conditions", href: "/" },
  { label: "Privacy Policy", href: "/" },
  { label: "Contact Us", href: "/contact" },
];

const contactItems = [
  {
    icon: FiPhone,
    label: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: FiMail,
    label: "support@autixo.com",
    href: "mailto:support@autixo.com",
  },
  {
    icon: FiMapPin,
    label: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

const socialLinks = [
  { icon: FiFacebook, label: "Facebook", href: "#" },
  { icon: FiInstagram, label: "Instagram", href: "#" },
  { icon: FiX, label: "X", href: "#" },
  { icon: FiLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer>
      <div className="w-[90%] mx-auto rounded-2xl border border-border bg-surface text-foreground mb-[3%]">
        <div className="px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1.15fr_1.15fr_1fr_1.35fr]">
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <LogoImageController />
              </div>

              <p className="max-w-sm text-sm text-muted">
                Autixo is your trusted partner for renting the perfect car for
                any journey. Browse, compare, and book with confidence in a
                polished light or dark interface.
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <Button
                    key={label}
                    as={Link}
                    href={href}
                    isIconOnly
                    aria-label={label}
                    className="border border-border bg-surface-secondary text-foreground"
                    rel="noreferrer"
                    size="sm"
                    target="_blank"
                    variant="light"
                  >
                    <Icon className="size-4" />
                  </Button>
                ))}
              </div>
            </section>

            <nav aria-label="Quick links" className="space-y-4">
              <h2 className="text-lg font-semibold">Quick Links</h2>
              <ul className="space-y-3 text-sm text-muted">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link className="hover:text-foreground" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company links" className="space-y-4">
              <h2 className="text-lg font-semibold">Company</h2>
              <ul className="space-y-3 text-sm text-muted">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link className="hover:text-foreground" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <ul className="space-y-4 text-sm">
                {contactItems.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <Link
                      className="flex items-center gap-3 text-muted hover:text-foreground"
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-secondary text-foreground">
                        <Icon className="size-4" />
                      </span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Newsletter</h2>
              <p className="text-sm text-muted">
                Subscribe to get updates and exclusive offers.
              </p>

              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  className="bg-accent text-accent-foreground"
                  size="md"
                  startContent={<FiSend className="size-4" />}
                  type="submit"
                >
                  Subscribe
                </Button>
              </form>
            </section>
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Autixo. All rights reserved.</p>
            <ul className="flex gap-4">
              <li>
                <Link className="hover:text-foreground" href="/terms">
                  Terms & Conditions
                </Link>
              </li>
              <Separator orientation="vertical" className="h-4" />
              <li>
                <Link className="hover:text-foreground" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
