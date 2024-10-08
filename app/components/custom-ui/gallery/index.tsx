"use client";

import { Gift } from "@/app/types/gift";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import GalleryTab from "./galleryTab";

interface GalleryProps {
  data: Gift;
};

const Gallery: React.FC<GalleryProps> = ({
  data
}) => {
  return (
    <>
      <TabGroup as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <TabList className="grid grid-cols-4 gap-6">
            {data?.data?.images?.map((image, index) => (
              <GalleryTab key={`${index}-${image.id}`} image={image} />
            ))}
          </TabList>
        </div>
        <TabPanels className="aspect-square w-full">
          {data?.data?.images?.map((image, index) => (
            <TabPanel key={`${index}-${image?.id}`}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden border">
                <Image
                  fill
                  src={image?.url}
                  alt="Image"
                  className="object-cover object-center"
                />
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  )
};

export default Gallery;