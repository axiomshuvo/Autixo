"use client";

import { Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FcAutomotive,
  FcBusinessman,
  FcDatabase,
  FcPlus,
  FcSettings,
} from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";

import { useSession } from "@/app/lib/auth-client";
import LogOutBtn from "@/components/utlis/LogOutBtn";
import LogoImageController from "@/providers/LogoImageController";
import ThemeController from "@/providers/ThemeController";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore-cars", label: "Explore Cars" },
  { href: "/add-car", label: "Add Car" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NavbarComponent() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const linkClass = (href) =>
    pathname === href
      ? "text-primary font-semibold"
      : "text-foreground/70 hover:text-foreground transition-colors";

  const mobileLinkClass = (href) =>
    pathname === href
      ? "rounded-lg bg-primary/10 px-3 py-2 font-semibold text-primary"
      : "rounded-lg px-3 py-2 hover:bg-default-100 hover:text-foreground";

  const renderLinks = (isMobile = false) =>
    navItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={
            isMobile ? mobileLinkClass(item.href) : linkClass(item.href)
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={isActive ? "font-semibold text-primary" : ""}>
            {item.label}
          </span>
        </Link>
      );
    });

  const DropdownLinks = (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <div
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-default-200 transition-transform"
          aria-label="Open user menu"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user?.name || "User"}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-foreground">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pb-1 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-default-200">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User"}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-foreground">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="dashboard">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/dashboard">
                <Label>Dashboard</Label>
              </Link>
              <FcDatabase className="size-3.5" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="profile">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/profile">
                <Label>Profile</Label>
              </Link>
              <FcBusinessman className="size-3.5" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="bookings">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/my-bookings">
                <Label>My Bookings</Label>
              </Link>
              <FcSettings className="size-3.5" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="add-car">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/add-car">
                <Label>Add Car</Label>
              </Link>
              <FcPlus className="size-3.5" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="my-cars">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/my-added-cars">
                <Label>My Added Cars</Label>
              </Link>
              <FcAutomotive className="size-3.5" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="logout" variant="danger">
            <LogOutBtn />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );

  return (
    <div className="mx-auto w-[90%] py-4">
      <nav className="bg-background/90 px-3 py-3 backdrop-blur-sm sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex w-42.5 min-w-25 items-center lg:w-45">
            <LogoImageController />
          </div>

          <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {renderLinks()}
          </div>

          <div className="hidden ml-auto shrink-0 items-center gap-3 lg:flex">
            {isPending ? (
              <span className="text-sm text-foreground/60">Loading...</span>
            ) : user ? (
              DropdownLinks
            ) : (
              <>
                <Link href="/login" className={linkClass("/login")}>
                  Login
                </Link>
                <Link href="/register" className={linkClass("/register")}>
                  Sign Up
                </Link>
              </>
            )}

            <ThemeController />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeController />
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-full p-2 text-foreground/70 transition hover:bg-default-100"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-3 border-t border-divider pt-3 lg:hidden">
            <div className="flex flex-col gap-2 rounded-xl bg-background/70 p-2">
              <div className="flex flex-col gap-2">{renderLinks(true)}</div>

              <div className="mt-1 border-t border-divider pt-3">
                {isPending ? (
                  <span className="text-sm text-foreground/60">Loading...</span>
                ) : user ? (
                  <div className="flex items-center justify-between px-1">
                    {DropdownLinks}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-1">
                    <Link href="/login" className={mobileLinkClass("/login")}>
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={mobileLinkClass("/register")}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
