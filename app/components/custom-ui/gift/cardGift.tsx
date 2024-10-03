"use client";

import { CircleCheckBig, Info, Store } from "lucide-react";
import { Button } from "../../ui/button";
import React from "react";
import { Skeleton } from "../../ui/skeleton";

interface Props {
  isSkeleton: boolean;
};

export const CardGift: React.FC<Props> = ({
  isSkeleton
}) => {
  if (isSkeleton) {
    return (
      <>
        <div className="flex flex-col gap-8 mt-12 p-2 md:p-8 transition rounded-lg">
          <Skeleton className="w-full h-[200px] md:h-[300px] rounded-lg" />

          <Skeleton className="w-full h-[20px] rounded-lg" />

          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <Skeleton className="w-full h-[32px] rounded-lg" />
            <Skeleton className="w-full h-[32px] rounded-lg" />
          </div>
        </div>
      </>
    )
  };

  return (
    <>
      <div className="flex flex-col gap-8 mt-12 p-2 md:p-8 transition rounded-lg bg-white md:bg-inherit hover:bg-white hover:shadow-lg">
        <div className="w-full h-[200px] md:h-[300px] bg-[#94A89C] rounded-lg flex items-center justify-center">
          <CircleCheckBig strokeWidth={0.5} className="h-32 w-32 text-white" />
        </div>

        <p className="font-medium text-start text-lg">
          Name gift
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <Button variant="outline" className="w-full">
            <Info className="mr-2 h-4 w-4" />
            <span>
              Mais detalhes
            </span>
          </Button>

          <Button className="w-full bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg">
            <Store className="mr-2 h-4 w-4" />
            <span>
              Presentear
            </span>
          </Button>
        </div>
      </div>
    </>
  )
};