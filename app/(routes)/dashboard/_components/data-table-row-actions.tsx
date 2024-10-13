"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/app/components/ui/button"

import usePreviewModalNotafiscal from "@/app/hooks/usePreviewNotafiscal"
import { EyeIcon } from "lucide-react"
import { giftSchema } from "../data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { onOpen } = usePreviewModalNotafiscal();
  const gift = giftSchema?.parse(row.original);

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => {
          onOpen(gift)
        }}>
          <EyeIcon className="w-4 h-4" />
        </Button>
        {/* <DownloadButton
          fileName="Nota fiscal da doação"
          imageUrl={gift?.file}
        /> */}
      </div>
    </>
  )
}
