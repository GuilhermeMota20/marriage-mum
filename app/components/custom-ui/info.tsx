"use client";

import { Gift } from "@/app/types/gift";
import { StoreIcon } from "lucide-react";
import { Button } from "../ui/button";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/app/hooks/usePreviewModal";

interface InfoProps {
  data?: Gift;
  isRedirectToPay?: boolean;
};

const Info: React.FC<InfoProps> = ({
  data,
  isRedirectToPay = false,
}) => {
  const { onClose } = usePreviewModal();
  const router = useRouter();

  const abrirPopup = () => {
    if (isRedirectToPay) {
      const url = data?.data?.linkPaid?.text;
      const options = 'width=600,height=800,menubar=0,toolbar=0,location=0';
      window.open(url, '_blank', options);
      return;
    };

    onClose();
    router?.push(`/gift/${data?.uid}`);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-4xl font-bold">
            {data?.data?.name}
          </h1>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-2xl font-bold">
              <Currency value={data?.data?.price} />
            </p>
          </div>

          <hr className="my-4" />

          <div className="flex flex-col gap-y-6">
            <h4 className="font-bold">Links para consulta de preços:</h4>

            {data!.data?.referralLinks?.length > 0 ? (
              <ul className="flex items-center gap-2">
                {data?.data?.referralLinks?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center rounded-lg px-2 transition hover:text-ring hover:bg-secondary hover:border"
                  >
                    <a href={item?.href} target="_blank">
                      {item?.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center border border-dashed p-3 bg-secondary rounded-lg text-sm">
                <p>
                  Nenhum link de referencia vinculado ao presente.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <h4 className="font-bold">Endereço do destinatário:</h4>
              <span>Rua aimorés, 80 torre 1 apto 307 - socorro</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="font-light text-xs">Observação: Os valores acima podem não coincidir com os do link de referência, pois os produtos estão sujeitos a promoções e aumentos de preço frequentes. Solicitamos que, caso o valor apresente uma discrepância significativa, você entre em contato com os administradores nos canais ao final da página.</p>

          <Button className="w-full bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg" onClick={abrirPopup}>
            <StoreIcon className="mr-2 h-4 w-4" />
            <span>
              Presentear
            </span>
          </Button>
        </div>
      </div >
    </>
  )
};

export default Info;