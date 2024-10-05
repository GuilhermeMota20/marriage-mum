"use client";

import { Loader2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { CardGift } from "./cardGift";
import { NotFound } from "./notFound";

export const Gift = () => {
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

        <h3 className="text-4xl font-bold">Lista de presentes</h3>

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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              <CardGift isSkeleton={isViewSkeleton} />
              <CardGift isSkeleton={isViewSkeleton} />
              <CardGift isSkeleton={isViewSkeleton} />
              <CardGift isSkeleton={isViewSkeleton} />
              <CardGift isSkeleton={isViewSkeleton} />
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