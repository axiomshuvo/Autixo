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
    <div className="relative w-48 h-20">
      <Link href="/" className="absolute inset-0 z-10" aria-label="Autixo Logo">
        <Image
          src={theme === "dark" ? logoWhite : logoDark}
          fill
          alt="Autixo Logo"
          className="rounded-full"
        />
      </Link>
    </div>
  );
}
