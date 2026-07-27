"use client";

import { Switch } from "@heroui/react";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeController() {
  const icons = {
    darkMode: {
      off: FiMoon,
      on: FiSun,
      selectedControlClass: "",
    },
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const handleChange = (selected) => {
    setIsDark(selected);
    console.log("work");
    const theme = selected ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="flex gap-3">
      {Object.entries(icons).map(([key, value]) => (
        <Switch
          key={key}
          aria-label={key}
          size="lg"
          isSelected={isDark}
          onChange={handleChange}
        >
          {({ isSelected }) => (
            <Switch.Content>
              <Switch.Control
                className={isSelected ? value.selectedControlClass : ""}
              >
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className="size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </Switch.Content>
          )}
        </Switch>
      ))}
    </div>
  );
}
