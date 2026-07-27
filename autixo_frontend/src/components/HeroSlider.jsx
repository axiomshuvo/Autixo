"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderImages } from "../app/lib/data";

export default function HeroSlider() {
  return (
    <div className="w-full h-[80dvh] relative">
      <Swiper
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        loop={true}
        speed={1500}
        slidesPerView={1}
        centeredSlides={true}
        modules={[Autoplay, EffectFade]}
        className=" mySwiper w-full h-full"
      >
        {sliderImages.map((slide) => (
          <SwiperSlide key={slide.id} className=" w-full h-full">
            <div className="w-full h-full relative">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/75 text-white flex flex-col justify-end items-center text-center ">
              <div className="max-w-2xl my-auto flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">
                  Drive More, <br /> Worry Less.
                </h2>
                <p className="text-xl md:text-2xl mb-6">
                  Find the perfect car for your lifestyle and budget. Explore
                  our wide selection of vehicles and take the first step towards
                  your dream ride today!
                </p>
                <div className="flex">
                  <Link href="/explore-cars">
                    <Button size="lg" variant="danger" className="mr-4">
                      Explore Inventory
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="primary">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
