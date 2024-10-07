import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/app/types/image";
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryTabProps {
  image: ImageType;
};

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return (
    <>
      <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
        {({ active }) => (
          <div>
            <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md border">
              <Image
                fill
                src={image.url}
                alt=""
                className="object-cover object-center"
              />
            </span>

            <span className={cn(
              "absolute inset-0 rounded-md right-2 ring-offset-2",
              active ? "ring-black" : "ring-transparent"
            )} />
          </div>
        )}
      </Tab>
    </>
  )
};

export default GalleryTab;