"use client";

import LogoMark from "@/app/assets/Logo-mark.svg";
import Image from "next/image";

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