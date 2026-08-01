"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FcAutomotive,
  FcBusinessman,
  FcDatabase,
  FcLeave,
  FcPlus,
} from "react-icons/fc";

import { useSession } from "@/app/lib/auth-client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FcDatabase },
  { href: "/profile", label: "Profile", icon: FcBusinessman },
  { href: "/add-car", label: "Add Car", icon: FcPlus },

  { href: "/my-added-cars", label: "My Cars", icon: FcAutomotive },
  { href: "/my-bookings", label: "My Bookings", icon: FcLeave },
];

export default function DashboardNavigation() {
  const { data: session, isPending } = useSession();
  // const user = session?.user;
  // console.log("user", user);

  // active menu item based on current route
  const pathname = usePathname();

  return (
    <aside className="relative mb-20 h-120 overflow-hidden rounded-2xl border border-default-200 bg-linear-to-br from-accent/95 via-accent to-primary/80 text-white shadow-lg md:min-h-125">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-10 size-36 rounded-full bg-white/15 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -left-10 size-32 rounded-full bg-black/20 blur-2xl"
      />

      <nav className="relative z-10 flex flex-col gap-4 p-2.5 text-white">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-2xl px-3 py-2 transition ${
              pathname === href
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
