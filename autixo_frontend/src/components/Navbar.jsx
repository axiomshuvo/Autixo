import Link from "next/link";

import LogoImageController from "@/providers/LogoImageController";
import ThemeController from "@/providers/ThemeController";

export default function Navbar() {
  const Navlinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/add-car"> Add Car</Link>{" "}
      </li>
      <li>
        <Link href="/my-bookings">My Bookings</Link>{" "}
      </li>
      <li>
        <Link href="/about">About</Link>{" "}
      </li>
      <li>
        <Link href="/contact">Contact</Link>{" "}
      </li>
    </>
  );

  //

  // right side links and dropdown
  const links = (
    <>
      <li>
        <Link href="/login">Login</Link>{" "}
      </li>
      <li>
        <Link href="/register">Sign Up</Link>{" "}
      </li>
      <li>
        <ThemeController />
      </li>
    </>
  );

  return (
    <div className="w-[90%] mx-auto py-4">
      <nav className="flex justify-between items-center w-full">
        <LogoImageController />

        <ul className="flex justify-between gap-5">{Navlinks}</ul>

        <ul className="flex justify-between gap-5">{links}</ul>
      </nav>
    </div>
  );
}
