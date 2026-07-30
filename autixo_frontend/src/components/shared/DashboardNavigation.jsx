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
  { href: "/my-bookings", label: "Bookings", icon: FcLeave },
  { href: "/add-car", label: "Add Car", icon: FcPlus },
  { href: "/my-added-car", label: "My Cars", icon: FcAutomotive },
];

export default function DashboardNavigation() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log("user", user);

  // active menu item based on current route
  const pathname = usePathname();

  return (
    <aside className="bg-accent  text-white h-120 md:min-h-[500px] mb-20 rounded-2xl ">
      <nav className="p-2.5 flex flex-col gap-4 text-white">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-2xl px-3 py-2 transition ${
              pathname === href
                ? "bg-white text-black font-semibold"
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
