import { Gift } from "@/app/types/gift";
import { create } from "zustand";

interface PreviewModalGift {
  isOpen: boolean;
  data?: Gift;
  onOpen: (data: Gift) => void;
  onClose: () => void;
};

const usePreviewModal = create<PreviewModalGift>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Gift) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;