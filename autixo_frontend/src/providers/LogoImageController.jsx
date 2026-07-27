"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoimgdark from "../../public/assets/autixo_logo_dark.png";
import logoimgwhite from "../../public/assets/autixo_logo_white.png";

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
      <Image
        src={theme === "dark" ? logoimgwhite : logoimgdark}
        fill
        alt="Autixo Logo"
        className=" rounded-full"
      />
    </div>
  );
}
