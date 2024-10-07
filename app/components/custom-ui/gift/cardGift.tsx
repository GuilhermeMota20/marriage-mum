"use client";

import { CircleCheckBig, Info, Store } from "lucide-react";
import React, { MouseEventHandler } from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import usePreviewModal from "@/app/hooks/usePreviewModal";
import { Gift } from "@/app/types/gift";
import Image from "next/image";

interface Props {
  data: Gift;
  isSkeleton: boolean;
};

export const CardGift: React.FC<Props> = ({
  data,
  isSkeleton,
}) => {
  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

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
        <div className="relative w-full h-[200px] md:h-[300px] bg-[#94A89C] rounded-lg flex items-center justify-center">
          {data?.images[0]?.url?.length > 0 ? (
            <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md border">
              <Image
                fill
                src={data?.images[0]?.url}
                alt="Gift image"
                className="object-cover object-center"
              />
            </span>
          ) : (
            <CircleCheckBig strokeWidth={0.5} className="h-32 w-32 text-white" />
          )}
        </div>

        <p className="font-medium text-start text-lg">
          {data?.name}
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <Button variant="outline" className="w-full" onClick={onPreview}>
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