import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";
import DashboardNavigation from "@/components/shared/DashboardNavigation";

export default async function DashBoardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 ">
      <DashboardNavigation />
      {children}
    </div>
  );
}
