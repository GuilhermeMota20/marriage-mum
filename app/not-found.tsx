"use client";

import { CircleOff } from "lucide-react";
import { Button } from "./components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen text-white">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold ">Oops! Algo deu errado...</h1>
        <p className="mt-2 font-semibold">Parece que a página que você está procurando não existe.</p>
      </div>

      <CircleOff strokeWidth={0.5} className="w-44 h-44" />

      <Button
        variant="secondary"
        onClick={() => window.location.href = "/"}
      >
        Voltar para a página inicial
      </Button>
    </div>
  );
};
