"use client";

import { ModeToggle } from "@/app/components/custom-ui/mode-toggle";
import { Button } from "@/app/components/ui/button";
import { useScrollTop } from "@/app/hooks/use-scrolled-top";
import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

export default function Header() {
  const { onOpenModalConfirmExit } = useGlobalsVariables();

  const scrolled = useScrollTop();

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full space-y-4 p-4 px-8 z-10",
        scrolled && "shadow-md backdrop-blur-md bg-slate-100/75 dark:bg-slate-800/75"
      )}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={onOpenModalConfirmExit}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Sair
            </Button>
            <ModeToggle variant="secondary" />
          </div>
        </div>
      </header>
    </>
  )
}