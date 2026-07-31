"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcMultipleInputs } from "react-icons/fc";

import { authClient } from "@/app/lib/auth-client";
import { toast } from "@heroui/react";

export default function LogOutBtn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await authClient.signOut();

      // Refresh Server Components
      router.refresh();

      // Redirect to login page
      router.replace("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md   transition hover:bg-default-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>{isLoading ? "Logging out..." : "Logout"}</span>

      <FcMultipleInputs className="size-4 -rotate-90" />
    </button>
  );
}
