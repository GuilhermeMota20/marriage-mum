"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { cn } from "@/lib/utils";
import { ImagesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonPrimary } from "./buttonPrimary";
import { Logo } from "./logo";
import { Navbar } from "./navbar";

export const Header = () => {
  const { onOpenModalConfirmPresence } = useGlobalsVariables();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 w-full p-8 justify-between items-center bg-white border-b z-30",
          "gap-4 md:grid md:grid-rows-2 md:grid-cols-2",
          "lg:px-24",
          "xl:grid-rows-1 xl:grid-cols-3",
        )}
      >
        <Logo />

        <div
          className={cn(
            "hidden",
            "md:block md:order-3 md:col-span-3 md:border-t md:pt-8",
            "xl:order-2 xl:col-span-1 xl:pt-0 xl:border-t-0"
          )}
        >
          <Navbar />
        </div>

        <div
          className={cn(
            "hidden items-center justify-center",
            "md:flex md:order-2",
            "xl:order-3",
          )}
        >
          <div className="flex items-center gap-4">
            <Button size="lg" variant="secondary" className="w-full shadow-lg">
              <ImagesIcon className="mr-2 h-4 w-4" />
              <span className="hidden lg:block">
                Acessar galeria
              </span>
            </Button>

            <ButtonPrimary onClick={onOpenModalConfirmPresence} />
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed bottom-0 left-0 w-full bg-white px-8 py-4 border-t rounded-t-lg z-30",
          "md:hidden",
          "",
        )}
      >
        <Navbar />
      </div>
    </>
  )
};