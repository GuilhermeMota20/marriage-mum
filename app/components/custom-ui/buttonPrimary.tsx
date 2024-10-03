"use client";

import { Ticket } from "lucide-react"
import { Button } from "../ui/button"
import React from "react";

interface Props {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
};

export const ButtonPrimary: React.FC<Props> = ({
  type,
  onClick,
}) => {
  return (
    <Button
      type={type}
      size="lg"
      className="bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg shadow-[#607A53]"
      onClick={onClick}
    >
      <Ticket className="mr-2 h-4 w-4" />
      Confirmar presença
    </Button>
  )
}
