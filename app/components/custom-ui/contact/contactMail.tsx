import { ContactPhone } from "@/app/types/contactPhone";
import { MailIcon } from "lucide-react";
import React from "react";
import FormContactMail from "../form/formContactMail";

interface Props {
  listContact: ContactPhone[];
};

export const ContactMail: React.FC<Props> = ({
  listContact,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-8 bg-white rounded-lg border shadow-lg px-12 py-16 col-span-1">
        <div className="flex items-center justify-start gap-8">
          <div className="p-4 bg-[#F4F4F4] rounded-lg w-fit">
            <MailIcon className="fill-[#49516F] stroke-[#fff]" />
          </div>

          <div className="flex flex-col text-start">
            <h4 className="text-lg font-bold">Contato por e-mail</h4>
            <p className="text-sm font-light">
              Nos envie um e-mail para maior detalhes.
            </p>
          </div>
        </div>

        <FormContactMail listContact={listContact} />
      </div>
    </>
  )
};