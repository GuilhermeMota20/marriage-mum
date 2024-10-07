import { Footer } from "@/app/components/custom-ui/footer";
import FormDestinatario from "@/app/components/custom-ui/form/formDestinatario";
import Gallery from "@/app/components/custom-ui/gallery";
import Info from "@/app/components/custom-ui/info";
import { TitleSection } from "@/app/components/custom-ui/titleSection";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MoveLeftIcon, ShieldCheck } from "lucide-react";

interface Props {
  params: {
    giftId: string;
  };
};

const mockData = {
  id: "1",
  name: "Jogo de panela",
  category: "cozinha",
  price: 670.00,
  isForDelivery: false,
  isArchived: false,
  isPaid: false,
  images: [
    {
      id: "1",
      url: "https://http2.mlstatic.com/D_NQ_NP_924143-MLB77404108295_072024-O.webp",
    },
    {
      id: "2",
      url: "https://http2.mlstatic.com/D_NQ_NP_975845-MLB77404108293_072024-O.webp",
    },
    {
      id: "3",
      url: "https://http2.mlstatic.com/D_NQ_NP_908397-MLB77404108287_072024-O.webp",
    },
  ],
  referralLinks: [
    // {
    //   label: "Amazon",
    //   href: "https://amazon.com.br"
    // }
  ],
  linkPaid: "https://nubank.com.br/cobrar/eymbt/6701d07f-1930-4976-9308-24cbc1c5595e"
};

const GiftPage: React.FC<Props> = async ({
  params
}) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-[#F4F4F4] h-100 flex flex-col items-center rounded-md">
      <div className="bg-white w-full border-b px-2 md:px-24 py-4 flex items-center justify-center rounded-t-lg text-xs">
        <ShieldCheck className="mr-4" />
        Aqui você tem 100% de privacidade; todas as suas informações estão completamente seguras.
      </div>

      <main className="flex flex-col p-2 md:p-8 lg:p-24 gap-8 w-full items-center sm:items-start">
        <Button variant="ghost" className="text-[#000] bg-white rounded-lg border px-4">
          <MoveLeftIcon className="mr-2" />
          Voltar
        </Button>

        <div>
          <TitleSection
            title="Orientações"
            description="Sigas as orientações abaixo, em caso de duvidas."
          />
          <p className="mt-4">Caso deseje presentear com o valor do item, selecione a aba "Presentar com Pix", mas se pretende comprar em algum site de sua escolha, clique em "Comprar de sites externos".</p>
          <p className="mt-4">Endereço do destinatário: <span className="text-sm font-light">Rua Acari Espada, n90 - 05887-220</span></p>
        </div>

        <Tabs defaultValue="pix" className="w-full">
          <TabsList className="w-full h-full md:ps-0 overflow-y-scroll mb-8">
            <TabsTrigger value="pix">Presentear com Pix</TabsTrigger>
            <TabsTrigger value="destinatario">Comprar de sites externos</TabsTrigger>
          </TabsList>

          <TabsContent
            value="pix"
            className="w-full drop-shadow-2xl"
          >
            <section
              className={cn(
                "w-full grid grid-cols-1 gap-8",
                "md:grid-cols-2"
              )}
            >
              <div className="flex flex-col gap-8">
                <TitleSection
                  title="Guia para Presentear"
                  description="Fiquem atentos a este passo a passo. Certifiquem-se de ler todas as etapas antes de concluir o presente!"
                />

                <ul className="flex flex-col gap-4">
                  <li>1. Clique no botão verde "Presentear", localizado à direita.</li>
                  <li>2. Ao clicar, você será redirecionado para uma nova página do Nubank.</li>
                  <li>3. Nesta página, você encontrará todas as informações necessárias para realizar o PIX.</li>
                  <li>4. Se estiver usando um dispositivo móvel, abra o aplicativo do seu banco e escaneie o QR Code.</li>
                  <li>5. Caso não tenha um dispositivo móvel acessível, copie e cole a chave no seu banco.</li>
                  <li>6. Pronto! Você acaba de ajudar um casal a realizar seus sonhos.</li>
                </ul>
              </div>

              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Gallery images={mockData.images} />

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <Info data={mockData} />
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent
            value="destinatario"
            className="w-full drop-shadow-2xl"
          >
            <FormDestinatario />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default GiftPage;