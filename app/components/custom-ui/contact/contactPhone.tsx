import { ContactPhone as ContactPhoneType } from "@/app/types/contactPhone";
import { removeSpecialCharacters } from "@/app/utils/removeSpecialCharacter";
import { cn } from "@/lib/utils";
import { MoveRightIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  contact: ContactPhoneType[];
};

export const ContactPhone: React.FC<Props> = ({
  title,
  contact,
}) => {
  const handleConfirmPresence = (message: string, numberPhone: string) => {
    const formatedPhone = removeSpecialCharacters(numberPhone);
    return `https://api.whatsapp.com/send?phone=+${formatedPhone}&text=${message}`;
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-start justify-between rounded-lg h-auto p-4 gap-8 decoration-transparent bg-white text-[#49516F] hover:text-[#49516F] shadow-lg",
          "md:flex-row md:items-center lg:px-12 lg:py-16",
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col items-start gap-4",
            "md:flex-row"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#F4F4F4] rounded-lg">
              <PhoneIcon className="fill-[#49516F] stroke-[#49516F]" />
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="flex md:hidden text-lg font-bold text-start text-wrap">
                {title}
              </h4>
              <p className="flex md:hidden text-sm font-light">Nos envie uma mensagem por WhatsApp para maior detalhes.</p>
            </div>
          </div>

          <div className="w-full flex flex-col text-start gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold hidden md:block">
                {title}
              </h4>
              <p className="hidden md:block text-sm font-light">Nos envie uma mensagem por WhatsApp para maior detalhes.</p>
            </div>

            <div className="w-full flex flex-col gap-2">
              {contact?.map((item, index) => (
                <Link
                  key={index}
                  href={handleConfirmPresence(item?.message, item?.number)}
                  className="flex justify-between items-center gap-2 cursor-pointer hover:bg-[#F4F4F4] py-1 px-4 rounded-md"
                >
                  <p className="text-sm font-light" >
                    <span className="font-medium">{`${item?.name}${" "}`}</span>
                    {item?.number}
                  </p>
                  <MoveRightIcon className="text-[#49516F] w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}