"use client";

import Image from "next/image";
import LogoMark from "@/app/assets/Logo-mark.svg";

export const Logo = () => {
  return (
    <>
      <Image
        priority
        src={LogoMark}
        width={180}
        alt="Logo Mark"
      />
    </>
  )
};