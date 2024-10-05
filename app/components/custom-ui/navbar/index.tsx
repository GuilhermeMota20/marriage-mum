"use client"

import { cn } from "@/lib/utils";
import { Ellipsis, Gift, HouseIcon, ImagesIcon, MapPinned, MessageSquareMore, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Links } from "./links";

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
  const [anchor, setAnchor] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        setAnchor(hash.substring(1));
      }
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex items-center justify-center gap-4">
          {mockData?.map((item, index) => (
            <div
              key={index}
              className="relative"
            >
              <Links
                label={item?.label}
                link={item?.link}
                active={anchor === item?.link}
              />

              <div
                className={cn(
                  "absolute w-full h-[2px] transition animate-in rounded-lg bottom-0",
                  anchor === item?.link ? "bg-[#94A89C]" : "animate-out"
                )}
              />
            </div>
          ))}
        </div>

        <div className="relative flex md:hidden items-center justify-between gap-2">
          <Link href={`#${mockData[2]?.link}`}>
            <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
              <Gift className="h-4 w-4" />
            </Button>
          </Link>

          <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
            <Ticket className="h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={handleToggleMenu}
            className={cn(
              "rounded-full shadow-lg",
              openMenu ? "brightness-90" : "",
            )}
          >
            <Ellipsis className="h-4 w-4" />
          </Button>

          <div
            className={cn(
              "absolute bg-white drop-shadow-lg w-full -z-30 bottom-16 rounded-lg border transition",
              openMenu ? "block animate-in" : "hidden animate-out"
            )}
          >
            <div className="flex flex-col items-start gap-8 p-4">
              <div className="w-full border-b pb-4">
                <h4 className="font-bold">Atalhos</h4>
              </div>

              <div className="grid grid-cols-2 w-full gap-2">
                <Link href={`#${mockData[0]?.link}`} className="flex flex-col items-center justify-center gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
                    <HouseIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-light">Apresentação</span>
                </Link>

                <Link href={`#${mockData[1]?.link}`} className="flex flex-col items-center justify-center gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
                    <MapPinned className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-light">Locais</span>
                </Link>

                <div className="flex flex-col items-center justify-center gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
                    <ImagesIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-light">Galeria</span>
                </div>

                <Link href={`#suport`} className="flex flex-col items-center justify-center gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full shadow-lg" onClick={handleCloseMenu}>
                    <MessageSquareMore className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-light">Contato/Suporte</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
};