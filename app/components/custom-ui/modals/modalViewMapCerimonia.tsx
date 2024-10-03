"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { IframeMapCerimonia } from "../iframeMaps/iframeMapCerimonia";
import Modal from "./modal";

export default function ModalViewMapCerimonia() {
  const { isOpenModalViewMap, onCloseModalViewMap } = useGlobalsVariables();

  return (
    <>
      {isOpenModalViewMap && (
        <Modal
          title="Nao sabe como chegar?"
          description="Aqui esta um mapa para facilitar sua locomoção."
          onClose={onCloseModalViewMap}
        >
          <IframeMapCerimonia />
        </Modal>
      )}
    </>
  )
}