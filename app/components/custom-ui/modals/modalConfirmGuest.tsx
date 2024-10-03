"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import Modal from "./modal";
import FormConfirmPresenca from "../form/formConfirmGuest";

export default function ModalConfirmGuest() {
  const { isOpenModalConfirmPresence, onCloseModalConfirmPresence } = useGlobalsVariables();

  return (
    <>
      {isOpenModalConfirmPresence && (
        <Modal
          title="Falta pouco!"
          description="Preencha os campos abaixo para confirmar sua presença neste dia tão esperado. Por favor, confirmar apenas se puder comparecer."
          onClose={onCloseModalConfirmPresence}
        >
          <FormConfirmPresenca />
        </Modal>
      )}
    </>
  )
}