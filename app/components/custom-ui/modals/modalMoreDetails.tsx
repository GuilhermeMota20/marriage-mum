import usePreviewModal from "@/app/hooks/usePreviewModal";
import React from "react";
import Gallery from "../gallery";
import Info from "../info";
import Modal from "./modal";

export const ModalMoreDetails: React.FC = () => {
  const previewModal = usePreviewModal();
  const gift = usePreviewModal((state) => state.data);

  if (!gift) {
    return null;
  };

  return (
    <>
      {previewModal?.isOpen ? (
        <Modal
          title=""
          description=""
          size="max-w-4xl"
          onClose={previewModal.onClose}
        >
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-4 lg:col-span-5">
              <Gallery images={gift.images} />
            </div>
            <div className="sm:col-span-8 lg:col-span-7 h-full">
              <Info data={gift} />
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}