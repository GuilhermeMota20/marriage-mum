import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  size?: "max-w-sm" | "max-w-md" | "max-w-lg" | "max-w-xl" | "max-w-2xl" | "max-w-4xl";
  onClose: () => void;
};

export default function Modal({ children, title, description, size, onClose }: ModalProps) {
  const closeModalHandler = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    };
  };

  return (
    <div
      className="xl:text-base sm:text-sm text-xs fixed bg-slate-600/[.2] top-0 left-0 w-screen h-full z-50 grid place-items-center p-2 text-slate-600 backdrop-blur-sm overflow-y-auto"
      onClick={closeModalHandler}
    >
      <div
        className={cn(
          "relative bg-background w-full rounded-md p-3 sm:p-5 flex flex-col justify-star",
          size ? size : "max-w-xl"
        )}
      >
        <div
          aria-label="close alert"
          className="absolute right-3 sm:right-4 rounded-md transition p-2 hover:bg-slate-100  hover:shadow-sm hover:cursor-pointer"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </div>
        <h2 className={cn(
          "font-medium mb-5 text-lg md:text-2xl",
          description && "mb-0"
        )}>
          {title}
        </h2>
        <span className="text-xs mb-5 pr-4">{description}</span>

        {children}
      </div>
    </div>
  )
}