"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { IframeMapRecepcao } from "../iframeMaps/iframeMapRecepcao";
import Modal from "./modal";

export default function ModalViewMapRecepcao() {
  const { isOpenModalViewMapRecepcao, onCloseModalViewMapRecepcao } = useGlobalsVariables();

  return (
    <>
      {isOpenModalViewMapRecepcao && (
        <Modal
          title="Nao sabe como chegar?"
          description="Aqui esta um mapa para facilitar sua locomoção."
          onClose={onCloseModalViewMapRecepcao}
        >
          <IframeMapRecepcao />
        </Modal>
      )}
    </>
  )
}