"use client";

import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import Modal from "./modal";

export default function ModalConfirmExit() {
  const { isOpenModalConfirmExit, onCloseModalConfirmExit } = useGlobalsVariables();
  const router = useRouter();

  return (
    <>
      {isOpenModalConfirmExit && (
        <Modal
          title="Atenção!"
          description="Deseja mesmo sair da tela de Controle administrativo?. Ao sair será obrigátorio inserir o Pin de segurança para acessar essa página novamente."
          onClose={onCloseModalConfirmExit}
        >
          <div className="flex items-center justify-end gap-4">
            <Button variant="destructive" onClick={() => {
              onCloseModalConfirmExit();
              router?.push("/");
            }}>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={onCloseModalConfirmExit}>
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}