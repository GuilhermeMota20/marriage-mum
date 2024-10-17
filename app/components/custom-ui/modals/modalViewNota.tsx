"use client";

import usePreviewModalNotafiscal from "@/app/hooks/usePreviewNotafiscal";
import { Button } from "../../ui/button";
import Modal from "./modal";
import Image from "next/image";

export default function ModalViewNota() {
  const { isOpen, onClose, data } = usePreviewModalNotafiscal();

  return (
    <>
      {isOpen && (
        <Modal
          title="Nota fiscal"
          description="Nota fiscal referente ao presente doado."
          onClose={onClose}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <Image
              src={data!.file!}
              alt={data!.uuid!}
              width={360}
              height={360}
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}