"use client";

import Image from "next/image";
import ScrolIcon from "@/app/assets/Scroll.svg";

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