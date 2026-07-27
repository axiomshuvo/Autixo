import AvailableCars from "@/components/AvailableCars";
import CarStats from "@/components/CarStats";
import HeroSlider from "@/components/HeroSlider";
export default function Home() {
  return (
    <>
      <HeroSlider />
      <AvailableCars />
      <CarStats />
    </>
  );
}
