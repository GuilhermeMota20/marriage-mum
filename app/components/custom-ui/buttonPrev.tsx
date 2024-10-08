"use client"

import { MoveLeftIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

export const ButtonPrev = () => {
  const router = useRouter();

  return (
    <>
      <Button variant="ghost" className="bg-white rounded-lg border px-4" onClick={() => router?.push("/")}>
        <MoveLeftIcon className="mr-2" />
        Voltar
      </Button>
    </>
  )
}