import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { CalendarHeart, Church, Clock4, Map } from "lucide-react";
import { Item } from "./item";

export const Cerimonia = () => {
  const { onOpenModalViewMap } = useGlobalsVariables();

  const mockData = [
    {
      icon: <CalendarHeart className="text-[#94A89C]" />,
      label: "18 de Janeiro de 2025",
    },
    {
      icon: <Clock4 className="text-[#94A89C]" />,
      label: "Inicio as 15h",
    },
    {
      icon: <Map className="text-[#94A89C]" />,
      label: "Rua Rubem Souto de Araujo, 666 - Jardim Beatriz - CEP 04835-080",
      action: onOpenModalViewMap,
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-start gap-8">
          <span className="font-bold text-xl">Cerimonia</span>
          <Church />
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