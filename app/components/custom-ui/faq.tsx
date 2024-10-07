import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { TitleSection } from "./titleSection";

const mockData = [
  {
    title: "Qual é a data e o horário do casamento?",
    description: "Verifique os convites ou mensagens dos noivos para confirmar a data e o horário. É sempre bom anotar na agenda para não esquecer!"
  },
  {
    title: "Onde será o casamento?",
    description: "O local geralmente é indicado no convite. Se tiver dúvidas, entre em contato com os noivos ou consulte o site do casamento, se houver."
  },
  {
    title: "Como faço para confirmar minha presença?",
    description: "O convite deve conter informações de RSVP. Caso contrário, entre em contato com os noivos para informar se irá ou não."
  },
  {
    title: "Há um código de vestimenta?",
    description: "Muitos convites incluem um 'dress code'. Se não houver, considere o estilo do casamento (formal, casual, temático) e pergunte aos noivos se tiver dúvidas."
  },
  {
    title: "Posso levar acompanhantes?",
    description: "Verifique se o convite menciona um número específico de convidados. Se não estiver claro, pergunte aos noivos."
  },
  {
    title: "Haverá alimentação e bebida?",
    description: "A maioria dos casamentos oferece comida e bebida. No entanto, se você tiver restrições alimentares, informe os noivos com antecedência."
  },
  {
    title: "Qual é o melhor presente para os noivos?",
    description: "Consulte a lista de presentes dos noivos, se houver. Se não, considere algo que eles realmente precisem ou um presente em dinheiro."
  },
  {
    title: "Haverá estacionamento disponível?",
    description: "Geralmente, o local do casamento terá informações sobre estacionamento. Caso contrário, entre em contato com os noivos ou consulte o convite."
  },
  {
    title: "Como será a programação do evento?",
    description: "Normalmente, o convite ou o site do casamento contém informações sobre a programação. Se não, pergunte aos noivos para se planejar melhor."
  },
];

export const Faq = () => {
  return (
    <>
      <section className="w-full flex flex-col gap-8 mb-32">
        <TitleSection
          title="Dúvidas frequentes"
          description="Segue uma lista das dúvidas mais frequentes de nossos usuários."
        />

        {mockData?.map((item, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                {`${index + 1}. ${item?.title}`}
              </AccordionTrigger>
              <AccordionContent>
                {item?.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </>
  )
}