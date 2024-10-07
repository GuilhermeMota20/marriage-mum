"use client";

import usePreviewModal from "@/app/hooks/usePreviewModal";
import { Loader2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { TitleSection } from "../titleSection";
import { CardGift } from "./cardGift";
import { NotFound } from "./notFound";

const mockData = [
  {
    id: "1",
    name: "Jogo de panela",
    category: "cozinha",
    price: 670.00,
    isForDelivery: false,
    isArchived: false,
    isPaid: false,
    images: [
      {
        id: "1",
        url: "https://http2.mlstatic.com/D_NQ_NP_924143-MLB77404108295_072024-O.webp",
      },
      {
        id: "2",
        url: "https://http2.mlstatic.com/D_NQ_NP_975845-MLB77404108293_072024-O.webp",
      },
      {
        id: "3",
        url: "https://http2.mlstatic.com/D_NQ_NP_908397-MLB77404108287_072024-O.webp",
      },
    ],
    referralLinks: [
      // {
      //   label: "Amazon",
      //   href: "https://amazon.com.br"
      // }
    ],
    linkPaid: "https://nubank.com.br/cobrar/eymbt/6701d07f-1930-4976-9308-24cbc1c5595e"
  },
  {
    id: "2",
    name: "Jogo de panela 2",
    category: "cozinha",
    price: 670.00,
    isForDelivery: false,
    isArchived: false,
    isPaid: false,
    images: [
      {
        id: "1",
        url: "https://http2.mlstatic.com/D_NQ_NP_924143-MLB77404108295_072024-O.webp",
      },
      {
        id: "2",
        url: "https://http2.mlstatic.com/D_NQ_NP_975845-MLB77404108293_072024-O.webp",
      },
      {
        id: "3",
        url: "https://http2.mlstatic.com/D_NQ_NP_908397-MLB77404108287_072024-O.webp",
      },
    ],
    referralLinks: [
      {
        label: "Amazon",
        href: "https://amazon.com.br"
      }
    ],
    linkPaid: "https://nubank.com.br/cobrar/eymbt/6701d07f-1930-4976-9308-24cbc1c5595e"
  },
  {
    id: "3",
    name: "Jogo de panela 3",
    category: "cozinha",
    price: 670.00,
    isForDelivery: false,
    isArchived: false,
    isPaid: false,
    images: [
      {
        id: "1",
        url: "https://http2.mlstatic.com/D_NQ_NP_924143-MLB77404108295_072024-O.webp",
      },
      {
        id: "2",
        url: "https://http2.mlstatic.com/D_NQ_NP_975845-MLB77404108293_072024-O.webp",
      },
      {
        id: "3",
        url: "https://http2.mlstatic.com/D_NQ_NP_908397-MLB77404108287_072024-O.webp",
      },
    ],
    referralLinks: [
      {
        label: "Amazon",
        href: "https://amazon.com.br"
      }
    ],
    linkPaid: "https://nubank.com.br/cobrar/eymbt/6701d07f-1930-4976-9308-24cbc1c5595e"
  },
];

export const Gift = () => {
  const previewModal = usePreviewModal();

  const [isViewSkeleton, setIsViewSkeleton] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleToggleFilter = () => {
    setIsViewSkeleton(true);
  };

  const handleLoadingMore = () => {
    setIsViewSkeleton(true);
    setIsLoadingMore(true);

    setTimeout(() => {
      setIsViewSkeleton(false);
      setIsLoadingMore(false);
    }, 2200);
  };

  useEffect(() => {
    if (isViewSkeleton) {
      setTimeout(() => {
        setIsViewSkeleton(false);
      }, 2200);
    }
  }, [isViewSkeleton]);

  return (
    <>
      <section className="w-full flex flex-col justify-start gap-8">
        <div id="gift" className="mb-36" />

        <TitleSection
          title="Lista de presentes"
        />

        <Tabs defaultValue="disponivel" className="w-full">
          <TabsList className="w-full h-full ps-36 md:ps-0 overflow-y-scroll">
            <TabsTrigger value="disponivel" onClick={handleToggleFilter}>Disponíveis</TabsTrigger>
            <TabsTrigger value="cozinha" onClick={handleToggleFilter}>Cozinha</TabsTrigger>
            <TabsTrigger value="eletro-domestico" onClick={handleToggleFilter}>Eletro domésticos</TabsTrigger>
            <TabsTrigger value="outros" onClick={handleToggleFilter}>Outros</TabsTrigger>
          </TabsList>

          <TabsContent
            value="disponivel"
            className="w-full drop-shadow-2xl"
          >
            {mockData?.length > 0 ? (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  {mockData?.map((item, index) => (
                    <CardGift
                      key={index}
                      data={item}
                      isSkeleton={isViewSkeleton}
                    />
                  ))}
                </div>

                <div className="w-full flex items-center justify-center mt-8">
                  {!isLoadingMore ? (
                    <Button variant="outline" onClick={handleLoadingMore}>
                      <RotateCw className="mr-2 h-4 w-4" />
                      <span>
                        Carregar mais
                      </span>
                    </Button>
                  ) : (
                    <Button disabled variant="outline">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>
                        Carregando
                      </span>
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <NotFound />
            )}
          </TabsContent>

          <TabsContent
            value="cozinha"
            className="w-full drop-shadow-2xl"
          >
            <NotFound />
          </TabsContent>

          <TabsContent
            value="eletro-domestico"
            className="w-full drop-shadow-2xl"
          >
            <NotFound />
          </TabsContent>

          <TabsContent
            value="outros"
            className="w-full drop-shadow-2xl"
          >
            <NotFound />
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
};