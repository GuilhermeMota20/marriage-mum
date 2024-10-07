"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleEllipsisIcon, LockIcon, TicketIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { ButtonPrimary } from "../buttonPrimary";
import { Links } from "./links";
import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";

const mockData = [
  {
    label: "Apresentação",
    link: "apressentation",
  },
  {
    label: "Resumo",
    link: "resumo",
  },
  {
    label: "Presentear",
    link: "gift",
  },
  {
    label: "Contato/Suporte",
    link: "suport",
  },
];

export const Navbar = () => {
  const { onOpenModalConfirmPresence } = useGlobalsVariables();

  return (
    <>
      <div className="hidden md:flex items-center justify-center gap-4">
        {mockData?.map((item, index) => (
          <div
            key={index}
            className="relative"
          >
            <Links
              label={item?.label}
              link={item?.link}
              active={
                false
                // anchor === item?.link
              }
            />

            <div
              className={cn(
                "absolute w-full h-[2px] transition animate-in rounded-lg bottom-0",
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex md:hidden items-center justify-between gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" type="button">
              <CircleEllipsisIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-8">
              <SheetTitle className="text-start">Atalhos</SheetTitle>
            </SheetHeader>

            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                {mockData?.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-start flex-col gap-4"
                  >
                    <Links
                      label={item?.label}
                      link={item?.link}
                      active={
                        false
                        // anchor === item?.link
                      }
                    />

                    <div
                      className={cn(
                        "absolute w-full h-[2px] transition animate-in rounded-lg bottom-0",
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full mb-12 flex flex-col gap-4">
                <div className="w-full flex gap-2 items-center justify-center p-4 rounded-lg bg-secondary transition hover:brightness-90 hover:shadow-lg hover:cursor-pointer">
                  <LockIcon className="mr-2 h-4 w-4" />
                  Acesso Administrativo
                </div>

                <div
                  onClick={() => {
                    onOpenModalConfirmPresence();
                  }}
                  className="w-full flex gap-2 items-center justify-center text-white p-4 rounded-lg bg-[#607A53] transition hover:bg-[#607A53] hover:brightness-90 hover:shadow-lg hover:shadow-[#607A53] hover:cursor-pointer"
                >
                  <TicketIcon className="mr-2 h-4 w-4" />
                  Confirmar presença
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
};