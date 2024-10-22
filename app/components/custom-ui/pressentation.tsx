"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { Heart, TicketIcon } from "lucide-react";
import Countdown from "./countDown";

export const Pressentation = () => {
  const { onOpenModalConfirmPresence } = useGlobalsVariables();
  const targetDate = new Date('2025-01-18T15:00:00');

  return (
    <>
      <div className="relative flex items- justify-center flex-col gap-12">
        <div className="absolute bg-[#607A53] w-4 h-[200px] top-0 -left-24" />

        <div className="flex items-start flex-col w-full gap-2">
          <span className="relative font-normal text-lg md:text-2xl">
            <Heart className="absolute right-0 -top-6 text-[#94A89C] fill-[#94A89C]" />
            Bem-vindo ao nosso espaço especial!
          </span>
          <p className="font-bold text-3xl md:text-5xl">
            Vamos juntos celebrar o nosso amor!
          </p>
        </div>

        <div className="flex items-start flex-col w-full gap-2">
          <i className="text-md font-light">
            “As muitas água não podem apagar este amor, nem os rios afogá-lo,
            ainda que alguém desse todos os bens de sua casa pelo amor,
            certamente o desprezariam”
          </i>

          <span className="font-normal text-md">
            Cantares de Salomão 8:7
          </span>
        </div>

        <Countdown targetDate={targetDate} />

        <div
          onClick={() => {
            onOpenModalConfirmPresence();
          }}
          className="flex md:hidden w-full gap-2 items-center justify-center text-white p-4 rounded-lg bg-[#607A53] transition hover:bg-[#607A53] hover:brightness-90 hover:shadow-lg hover:shadow-[#607A53] hover:cursor-pointer"
        >
          <TicketIcon className="mr-2 h-4 w-4" />
          Confirmar presença
        </div>
      </div>
    </>
  )
};