import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { ImagesIcon } from "lucide-react";

interface Props {
  label: string;
  link: string;
  active: boolean;
}

export const Links: React.FC<Props> = ({
  label,
  link,
  active,
}) => {
  return (
    <>
      <div>
        <Link
          href={`#${link}`}
          className={cn(
            "text-sm",
            active ? "font-bold" : ""
          )}
        >
          {label}
        </Link>
      </div>
    </>
  )
};