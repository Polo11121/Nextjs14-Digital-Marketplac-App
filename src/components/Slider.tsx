"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type SwiperType from "swiper";
import Image from "next/image";
import "swiper/css/pagination";
import "swiper/css";

type Props = {
  urls: string[];
};

export const Slider = ({ urls }: Props) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState(() => ({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  }));

  const swipeHandler = (swiper: SwiperType) => setSwiper(swiper);

  const swipeRightHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    swiper?.slideNext();
  };

  const swipeLeftHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    swiper?.slidePrev();
  };

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex: currentActiveIndex }) => {
      setActiveIndex(currentActiveIndex);
      setSlideConfig({
        isBeginning: currentActiveIndex === 0,
        isEnd: currentActiveIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-item-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text gray-400";

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={swipeRightHandler}
          className={cn(activeStyles, "right-3 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          onClick={swipeLeftHandler}
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet: (_, className) =>
            `<span class="${className} rounded-full transition"></span>`,
        }}
        onSwiper={swipeHandler}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        className="h-full w-full"
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
