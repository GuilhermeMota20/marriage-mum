import { cn } from "@/lib/utils";
import { ContactMail } from "./contactMail";
import { ContactPhone } from "./contactPhone";

const mockData = [
  {
    name: "Fernanda",
    number: "+55 11 94523-7326"
  },
  {
    name: "Gilson",
    number: "+55 11 91484-0810"
  },
];

const mockData2 = [
  {
    name: "Guilherme",
    number: "+55 11 93033-9592"
  },
];

export const Contact = () => {
  return (
    <>
      <section className="w-full flex flex-col gap-8 mb-32">
        <div id="suport" className="mb-36" />

        <div className="flex flex-col border-b pb-4">
          <h2 className="text-4xl font-bold">Contato/Suporte</h2>
          <p className="text-sm font-light">
            Tire suas dúvidas enviando uma mensagem ao desenvolvedor ou administrador pelo WhatsApp ou pelos outros meios de comunicação listados abaixo:
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 grid-rows-1 gap-8 drop-shadow-2xl",
            "lg:grid-cols-2 lg:grid-rows-2"
          )}
        >
          <ContactPhone title="Contato com os Administradores" contact={mockData} />
          <ContactPhone title="Contato com o Desenvolvedor" contact={mockData2} />

          <ContactMail />
        </div>
      </section >
    </>
  )
};