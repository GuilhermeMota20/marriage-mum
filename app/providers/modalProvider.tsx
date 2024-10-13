"use client";

import { useEffect, useState } from "react";
import ModalConfirmGuest from "../components/custom-ui/modals/modalConfirmGuest";
import ModalViewMapCerimonia from "../components/custom-ui/modals/modalViewMapCerimonia";
import ModalViewMapRecepcao from "../components/custom-ui/modals/modalViewMapRecepcao";
import { ModalMoreDetails } from "../components/custom-ui/modals/modalMoreDetails";
import { ModalPinAccess } from "../components/custom-ui/modals/modalPinAccess";
import ModalConfirmExit from "../components/custom-ui/modals/modalConfirmExit";
import ModalViewNota from "../components/custom-ui/modals/modalViewNota";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  };

  return (
    <>
      <ModalViewMapCerimonia />
      <ModalViewMapRecepcao />
      <ModalConfirmGuest />
      <ModalMoreDetails />
      <ModalPinAccess />
      <ModalConfirmExit />
      <ModalViewNota />
    </>
  )
}