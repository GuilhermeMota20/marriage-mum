/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useGiftConfirmPaid } from "@/app/hooks/useGiftConfirmPaid";
import { getGifts } from "@/app/hooks/useGifts";
import { GiftsPagination, Gift as TypeGift } from "@/app/types/gift";
import { Loader2, RotateCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
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
  const [nextPage, setNextPage] = useState(1);
  const [isViewSkeleton, setIsViewSkeleton] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [categorys, setCategorys] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("disponiveis");

  const handleToggleFilter = (value: string) => {
    setIsViewSkeleton(true);
    setIsLoadingMore(true);
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
      setIsLoadingMore(false);
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

  async function handleNextPage() {
    if (!nextPage || nextPage === 0) return;

    setIsViewSkeleton(true);
    setIsLoadingMore(true);

    try {
      const { giftsPagination: nextPageData } = await getGifts(nextPage);
      setNextPage(Number(nextPageData.next_page));
      setGifts(prevGifts => [
        ...prevGifts,
        ...nextPageData.results as unknown as TypeGift[]
      ]);
    } catch (error) {
      console.error("Erro ao carregar mais presentes:", error);
    } finally {
      setTimeout(() => {
        setIsViewSkeleton(false);
        setIsLoadingMore(false);
      }, 2300);
    }
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
        <TabsList className="w-full h-full ps-36 md:ps-0 overflow-y-scroll">
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

              <div className="w-full flex items-center justify-center mt-8">
                {!isLoadingMore ? (
                  <Button variant="outline" onClick={handleNextPage}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    <span>Carregar mais</span>
                  </Button>
                ) : (
                  <Button disabled variant="outline">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Carregando</span>
                  </Button>
                )}
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
