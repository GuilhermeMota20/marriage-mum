import { Gift } from "@/app/(routes)/dashboard/data/schema";
import { create } from "zustand";

interface PreviewModalNotafiscal {
  isOpen: boolean;
  data?: Gift;
  onOpen: (data: Gift) => void;
  onClose: () => void;
};

const usePreviewModalNotafiscal = create<PreviewModalNotafiscal>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Gift) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModalNotafiscal;