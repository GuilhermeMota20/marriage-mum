/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useGiftConfirmPaid } from "@/app/hooks/useGiftConfirmPaid";
import { GiftsPagination, Gift as TypeGift } from "@/app/types/gift";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { TitleSection } from "../titleSection";
import { CardGift } from "./cardGift";
import { NotFound } from "./notFound";

interface Props {
  giftsPagination: GiftsPagination;
};

export const Gift: React.FC<Props> = ({
  giftsPagination
}) => {
  const { confirmPaid } = useGiftConfirmPaid();

  const [gifts, setGifts] = useState<TypeGift[]>([]);
  const [isViewSkeleton, setIsViewSkeleton] = useState(true);
  const [categorys, setCategorys] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("disponiveis");

  const handleToggleFilter = (value: string) => {
    setIsViewSkeleton(true);
    setCurrentTab(value);

    if (value === "disponiveis") {
      const availableGifts = giftsPagination.results.filter(item =>
        item?.data?.isPaid === false && !confirmPaid.some(paidItem => paidItem.uuid === item.uid)
      );
      setGifts(availableGifts);
    } else {
      const filteredGifts = giftsPagination.results.filter(item =>
        item?.data?.category === value && !confirmPaid.some(paidItem => paidItem.uuid === item.uid)
      );
      setGifts(filteredGifts);
    }

    setTimeout(() => {
      setIsViewSkeleton(false);
    }, 2300);
  };

  const handleGetCategorys = () => {
    const uniqueCategories = new Set<string>();

    giftsPagination.results.forEach((item) => {
      const category = item?.data?.category;
      if (category) {
        const allPaid = giftsPagination.results
          .filter(gift => gift?.data?.category === category)
          .every(gift => confirmPaid.some(paidItem => paidItem.uuid === gift.uid));

        if (!allPaid) {
          uniqueCategories.add(category);
        }
      }
    });

    setCategorys(Array.from(uniqueCategories));
  };

  useEffect(() => {
    if (!giftsPagination || !confirmPaid) return;

    const confirmedUuids = new Set(confirmPaid.map(item => item.uuid));
    const results = giftsPagination.results.filter(item => !confirmedUuids.has(item.uid));

    setGifts(results);
    handleGetCategorys();
    setIsViewSkeleton(false);
  }, [giftsPagination, confirmPaid]);

  useEffect(() => {
    if (giftsPagination.results.length > 0) {
      handleGetCategorys();
    }
  }, [giftsPagination]);

  return (
    <section className="w-full flex flex-col justify-start gap-8">
      <div id="gift" className="mb-36" />
      <TitleSection title="Lista de presentes" />

      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList className="w-full h-full overflow-y-scroll">
          <TabsTrigger
            value="disponiveis"
            onClick={() => handleToggleFilter("disponiveis")}
          >
            disponiveis
          </TabsTrigger>

          {categorys.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item}
              onClick={() => handleToggleFilter(item)}
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentTab} className="w-full drop-shadow-2xl">
          {gifts.length > 0 ? (
            <>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {gifts.map((item, index) => (
                  <CardGift
                    key={`${item?.uid}-${index}`}
                    data={item}
                    isSkeleton={isViewSkeleton}
                  />
                ))}
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};
