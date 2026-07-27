"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderImages } from "../lib/data";

export default function HeroSlider() {
  return (
    <div className="w-full h-100 md:h-150 lg:h-190 relative">
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
              <div className="absolute top-[70%] bottom-0 left-0 right-0 bg-black/50 flex flex-col justify-end items-center text-center text-white py-20 px-4 md:px-8 lg:px-16">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
