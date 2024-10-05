"use client";

import ScrolIcon from "@/app/assets/Scroll.svg";
import Image from "next/image";

export const Scroll = () => {
  return (
    <>
      <Image
        priority
        src={ScrolIcon}
        className="hidden md:block"
        alt="Scroll (Role para baixo)"
      />
    </>
  )
};