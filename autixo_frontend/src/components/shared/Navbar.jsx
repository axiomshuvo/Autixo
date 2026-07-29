"use client";

import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { FcBusinessman, FcSettings } from "react-icons/fc";

import { useSession } from "@/app/lib/auth-client";
import LogOutBtn from "@/components/utlis/LogOutBtn";
import LogoImageController from "@/providers/LogoImageController";
import ThemeController from "@/providers/ThemeController";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const Navlinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/explore-cars">Explore Cars</Link>
      </li>

      <li>
        <Link href="/add-car">Add Car</Link>
      </li>

      <li>
        <Link href="/my-bookings">My Bookings</Link>
      </li>

      <li>
        <Link href="/about">About</Link>
      </li>

      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  const DropdownLinks = (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
            alt={user?.name || "User"}
          />
          <Avatar.Fallback delayMs={600}>
            {user?.name?.[0] || "U"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                alt={user?.name || "User"}
              />
              <Avatar.Fallback delayMs={600}>
                {user?.name?.[0] || "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium">{user?.name}</p>

              <p className="text-xs text-muted">{user?.email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="dashboard">
            <Link href="/dashboard">
              <Label>Dashboard</Label>
            </Link>
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
            <Link href="/add-car">
              <Label>Add Car</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item id="my-cars">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/my-added-cars">
                <Label>My Added Cars</Label>
              </Link>

              <FcBusinessman className="size-3.5" />
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
    <div className="w-[90%] mx-auto py-4">
      <nav className="flex justify-between items-center w-full">
        <LogoImageController />

        <ul className="flex gap-5">{Navlinks}</ul>

        <ul className="flex gap-5">
          {isPending ? (
            <li>Loading...</li>
          ) : user ? (
            <li>{DropdownLinks}</li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>

              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            </>
          )}

          <li>
            <ThemeController />
          </li>
        </ul>
      </nav>
    </div>
  );
}
