import { create } from "zustand";

type GlonalsVariablesType = {
  isOpenModalConfirmPresence: boolean;
  onOpenModalConfirmPresence: () => void;
  onCloseModalConfirmPresence: () => void;

  isOpenModalViewMap: boolean;
  onOpenModalViewMap: () => void;
  onCloseModalViewMap: () => void;

  isOpenModalViewMapRecepcao: boolean;
  onOpenModalViewMapRecepcao: () => void;
  onCloseModalViewMapRecepcao: () => void;

  isOpenModalGiftMore: boolean;
  onOpenModalGiftMore: () => void;
  onCloseModalGiftMore: () => void;

  isOpenModalPinAccess: boolean;
  onOpenModalPinAccess: () => void;
  onCloseModalPinAccess: () => void;

  isOpenModalConfirmExit: boolean;
  onOpenModalConfirmExit: () => void;
  onCloseModalConfirmExit: () => void;

  isOpenModalViewNota: boolean;
  onOpenModalViewNota: () => void;
  onCloseModalViewNota: () => void;
};

export const useGlobalsVariables = create<GlonalsVariablesType>((
  set, 
) => ({
  isOpenModalConfirmPresence: false,
  onOpenModalConfirmPresence: () => set({ isOpenModalConfirmPresence: true }),
  onCloseModalConfirmPresence: () => set({ isOpenModalConfirmPresence: false }),
  
  isOpenModalViewMap: false,
  onOpenModalViewMap: () => set({ isOpenModalViewMap: true }),
  onCloseModalViewMap: () => set({ isOpenModalViewMap: false }),
  
  isOpenModalViewMapRecepcao: false,
  onOpenModalViewMapRecepcao: () => set({ isOpenModalViewMapRecepcao: true }),
  onCloseModalViewMapRecepcao: () => set({ isOpenModalViewMapRecepcao: false }),
  
  isOpenModalGiftMore: false,
  onOpenModalGiftMore: () => set({ isOpenModalGiftMore: true }),
  onCloseModalGiftMore: () => set({ isOpenModalGiftMore: false }),
  
  isOpenModalPinAccess: false,
  onOpenModalPinAccess: () => set({ isOpenModalPinAccess: true }),
  onCloseModalPinAccess: () => set({ isOpenModalPinAccess: false }),

  isOpenModalConfirmExit: false,
  onOpenModalConfirmExit: () => set({ isOpenModalConfirmExit: true }),
  onCloseModalConfirmExit: () => set({ isOpenModalConfirmExit: false }),

  isOpenModalViewNota: false,
  onOpenModalViewNota: () => set({ isOpenModalViewNota: true }),
  onCloseModalViewNota: () => set({ isOpenModalViewNota: false }),
}));
