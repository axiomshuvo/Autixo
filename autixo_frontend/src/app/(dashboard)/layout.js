import DashboardNavigation from "@/components/shared/DashboardNavigation";

export default function DashBoardLayout({ children }) {
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-3 ">
      <DashboardNavigation />
      {children}
    </div>
  );
}
