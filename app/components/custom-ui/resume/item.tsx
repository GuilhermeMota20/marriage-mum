"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  action?: () => void;
};

export const Item: React.FC<Props> = ({
  icon,
  label,
  action
}) => {
  return (
    <>
      <li className={cn(
        "flex items-center justify-start gap-4",
        action ? "cursor-pointer" : ""
      )}
        onClick={action}
      >
        <div className="bg-white shadow-lg p-4 rounded-md">
          {icon}
        </div>
        <span className="text-sm md:text-inherit font-semibold">
          {label}
        </span>
      </li>
    </>
  )
};