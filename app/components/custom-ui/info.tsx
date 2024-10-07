"use client";

import { Gift } from "@/app/types/gift";
import { StoreIcon } from "lucide-react";
import { Button } from "../ui/button";
import Currency from "./currency";

interface InfoProps {
  data?: Gift;
};

const Info: React.FC<InfoProps> = ({
  data
}) => {
  const abrirPopup = () => {
    window.open(`${data?.linkPaid}`, "Popup", "width=600,height=800");
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-4xl font-bold">
            {data?.name}
          </h1>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-2xl font-bold">
              <Currency value={data?.price} />
            </p>
          </div>

          <hr className="my-4" />

          <div className="flex flex-col gap-y-6">
            <h4 className="font-bold">Links para consulta de preços:</h4>

            {data?.referralLinks?.length! > 0 ? (
              <ul className="flex items-center gap-2">
                {data?.referralLinks?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center rounded-lg px-2 transition hover:text-ring hover:bg-secondary hover:border"
                  >
                    <a href={item?.href} target="_blank" rel="noopener noreferrer">
                      {item?.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center border border-dashed p-3 bg-secondary rounded-lg text-sm">
                Nenhum link de referencia vinculado ao presente.
              </div>
            )}
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
      </div>
    </>
  )
};

export default Info;