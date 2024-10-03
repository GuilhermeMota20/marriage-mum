import React from "react"
import { Button } from "../../ui/button"
import { cn } from "@/lib/utils"
import { MoveRightIcon, PhoneIcon } from "lucide-react"
import { ContactPhone as ContactPhoneType } from "@/app/types/contactPhone";

interface Props {
  title: string;
  contact: ContactPhoneType[];
};

export const ContactPhone: React.FC<Props> = ({
  title,
  contact,
}) => {
  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "flex flex-col items-start justify-between h-auto p-4 gap-8 decoration-transparent text-[#49516F] hover:text-[#49516F] shadow-lg",
          "md:flex-row md:items-center lg:px-12 lg:py-16",
        )}
      >
        <div
          className={cn(
            "flex flex-col items-start gap-8",
            "md:flex-row"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#F4F4F4] rounded-lg">
              <PhoneIcon className="fill-[#49516F] stroke-[#49516F]" />
            </div>
            <h4 className="flex md:hidden text-lg font-bold text-start text-wrap">
              {title}
            </h4>
          </div>

          <div className="flex flex-col text-start">
            <h4 className="text-lg font-bold hidden md:block">
              {title}
            </h4>

            {contact?.map((item, index) => (
              <p className="text-sm font-light" key={index}>
                <span className="font-medium">{`${item?.name}${" "}`}</span>
                {item?.number}
              </p>
            ))}
          </div>
        </div>

        <MoveRightIcon strokeWidth={1} className="hidden md:flex text-[#49516F] w-8 h-8" />
      </Button>
    </>
  )
}