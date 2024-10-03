"use client";

import Image from "next/image";
import BannerImg from "@/app/assets/bg_banner.png";

export const Banner = () => {
  return (
    <>
      <div className="relative w-full h-full mt-8 mb-24 xl:mb-auto lg:mt-0 flex items-center justify-end">
        <div className="flex xl:absolute w-full -right-24 -top-12 z-20">
          <Image
            priority
            src={BannerImg}
            alt="Banner"
          />
        </div>
      </div>
    </>
  )
};