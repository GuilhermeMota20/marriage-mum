import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { CalendarHeart, Clock4, Map, PartyPopper } from "lucide-react";
import { Item } from "./item";

export const Recepcao = () => {
  const { onOpenModalViewMapRecepcao } = useGlobalsVariables();

  const mockData = [
    {
      icon: <CalendarHeart className="text-[#94A89C]" />,
      label: "18 de Janeiro de 2025",
    },
    {
      icon: <Clock4 className="text-[#94A89C]" />,
      label: "Inicio as 19h 30min",
    },
    {
      icon: <Map className="text-[#94A89C]" />,
      label: "rua dois, 21 jd são Nicolau - parelheiros - cep 04884-035",
      action: onOpenModalViewMapRecepcao,
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-start gap-8">
          <span className="font-bold text-xl">Recepção</span>
          <PartyPopper />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {mockData?.map((resumo, index) => (
            <Item
              key={index}
              icon={resumo?.icon}
              label={resumo?.label}
              action={resumo?.action}
            />
          ))}
        </div>
      </div>
    </>
  )
}