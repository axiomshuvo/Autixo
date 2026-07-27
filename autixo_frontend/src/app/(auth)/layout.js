import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineTag,
} from "react-icons/hi2";
import { TbCar } from "react-icons/tb";

const features = [
  { icon: HiOutlineCheckCircle, label: "Wide selection of verified vehicles" },
  { icon: HiOutlineClock, label: "Instant booking confirmation" },
  { icon: HiOutlineShieldCheck, label: "24/7 customer support" },
  { icon: HiOutlineTag, label: "Transparent, no-surprise pricing" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="container mx-auto my-[5%] flex min-h-[calc(100vh-1px)] flex-1 overflow-hidden rounded-2xl border border-border shadow-xl">
      <div className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-linear-to-br from-accent to-[oklch(24%_0.12_292.1)] p-10 text-accent-foreground lg:flex">
        <div
          aria-hidden
          className="absolute -top-24 -right-16 size-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-28 -left-20 size-80 rounded-full bg-black/20 blur-3xl"
        />

        <div className="relative z-10 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
            <TbCar className="size-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight">Autixo</span>
        </div>

        <div className="relative z-10 flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <p className="text-4xl leading-tight font-semibold">
              Rent the perfect car for any journey
            </p>
            <p className="max-w-sm text-sm text-accent-foreground/75">
              Browse, compare, and book with confidence — Autixo makes car
              rental simple.
            </p>
          </div>

          <ul className="flex flex-col gap-3.5">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="size-4" />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-accent-foreground/60">
          {/* © {new Date().getFullYear()} Autixo. All rights reserved. */}
          Drive more, worry less.
        </p>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-3/5 lg:p-14">
        {children}
      </div>
    </div>
  );
}
