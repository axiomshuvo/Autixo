"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logoDark from "../assets/images/autixo_logo_dark.png";
import logoWhite from "../assets/images/autixo_logo_white.png";

export default function LogoImageController() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const html = document.documentElement;

    const syncTheme = () => {
      setTheme(html.getAttribute("data-theme") || "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-12 w-28 items-center justify-center sm:h-14 sm:w-32 lg:h-16 lg:w-36">
      <Link
        href="/"
        className="relative h-full w-full"
        aria-label="Autixo Logo"
      >
        <Image
          loading="eager"
          src={theme === "dark" ? logoWhite : logoDark}
          fill
          alt="Autixo Logo"
          className="object-contain"
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
        />
      </Link>
    </div>
  );
}
