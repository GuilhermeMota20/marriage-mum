import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { TitleSection } from "./titleSection";
import React from "react";
import { FaqType } from "@/app/types/faq";

interface Props {
  resultsFaq: FaqType[]
};

export const Faq: React.FC<Props> = ({
  resultsFaq,
}) => {
  return (
    <>
      {resultsFaq[0]?.data?.faqs?.length > 0 ? (
        <section className="w-full flex flex-col gap-8 mb-32">
          <TitleSection
            title="Dúvidas frequentes"
            description="Segue uma lista das dúvidas mais frequentes de nossos usuários."
          />

          {resultsFaq[0]?.data?.faqs?.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  {`${index + 1}. ${item?.question}`}
                </AccordionTrigger>
                <AccordionContent>
                  {item?.response}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      ) : null}
    </>
  )
}