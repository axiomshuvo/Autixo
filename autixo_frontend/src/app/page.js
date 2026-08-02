import CarStats from "@/components/CarStats";
import FeatureCars from "@/components/FeatureCars";
import HeroSlider from "@/components/HeroSlider";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CarCardSkeleton from "@/components/skeleton/CarCardSkeleton";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <HeroSlider />
      <HowItWorksSection />

      <Suspense
        fallback={
          <div className=" container mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-4">
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
          </div>
        }
      >
        <FeatureCars />
      </Suspense>

      <CarStats />
      <WhyChooseUsSection />
    </>
  );
}
