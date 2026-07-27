import { carStats } from "@/lib/data";
import { Separator } from "@heroui/react";

export default function CarStats() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  my-20">
      <h2 className="text-7xl font-bold ">Drive Luxury Live Freedom</h2>
      <div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-2xl mb-5">
            Experience Premium Car rentals crafted for comfort, performance, and
            style. Whether it's a quick business trip or a weekend getaway, we
            have the perfect vehicle for you.
          </h3>
          <Separator
            orientation="horizontal"
            className="w-3/4 rounded-full  mx-auto animate-pulse bg-linear-to-r from-blue-500 via-violet-500 to-pink-500  "
          />
        </div>

        <div className="stats-stacked grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {carStats.map((stat) => (
            <div key={stat.id} className="stat flex  gap-2">
              <Separator orientation="vertical" />
              <div className="flex flex-col justify-center ml-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm ">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
