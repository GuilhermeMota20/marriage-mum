/* eslint-disable react/no-unescaped-entities */
import { ButtonPrev } from "@/app/components/custom-ui/buttonPrev";
import { Footer } from "@/app/components/custom-ui/footer";
import FormDestinatario from "@/app/components/custom-ui/form/formDestinatario";
import Gallery from "@/app/components/custom-ui/gallery";
import Info from "@/app/components/custom-ui/info";
import { TitleSection } from "@/app/components/custom-ui/titleSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { getGiftsByUid } from "@/app/hooks/useGiftsByUid";
import { Gift } from "@/app/types/gift";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("presentes", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.name,
    description: page.data.category,
    openGraph: {
      title: page.data.name ?? undefined,
      images: [{
        url: page.data.images[0]?.url?.url ?? ""
      }],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { resultGift } = await getGiftsByUid({ params });

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-[#F4F4F4] h-100 flex flex-col items-center rounded-md">
      <div className="bg-white w-full border-b px-2 md:px-24 py-4 flex items-center justify-center rounded-t-lg text-xs">
        <ShieldCheck className="mr-4" />
        Aqui você tem 100% de privacidade; todas as suas informações estão completamente seguras.
      </div>

      <main className="flex flex-col p-2 md:p-8 lg:p-24 gap-8 w-full items-center sm:items-start">
        <ButtonPrev />

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
                  <li>1. Clique no botão verde 'Presentear', localizado à direita.</li>
                  <li>2. Ao clicar, você será redirecionado para uma nova página do Nubank.</li>
                  <li>3. Nesta página, você encontrará todas as informações necessárias para realizar o PIX.</li>
                  <li>4. Se estiver usando um dispositivo móvel, abra o aplicativo do seu banco e escaneie o QR Code.</li>
                  <li>5. Caso não tenha um dispositivo móvel acessível, copie e cole a chave no seu banco.</li>
                  <li>6. Coloque uma descrição ao realizar o pix para facilitar o rastreamento do presente na plataforma.</li>
                  <li>7. Pronto! Você acaba de ajudar um casal a realizar seus sonhos.</li>
                </ul>
              </div>

              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Gallery data={resultGift as unknown as Gift} />

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <Info data={resultGift as unknown as Gift} isRedirectToPay={true} />
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent
            value="destinatario"
            className="w-full drop-shadow-2xl flex flex-col gap-24"
          >
            <div
              className={cn(
                "grid grid-cols-1 gap-4",
                "md:grid-cols-2"
              )}
            >
              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Endereço do destinatário:</h4>
                <span>Rua aimorés, 80 torre 1 apto 307 - socorro</span>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Links para consulta de preços:</h4>

                {resultGift!.data?.referralLinks?.length > 0 ? (
                  <ul className="flex items-center gap-2">
                    {resultGift?.data?.referralLinks?.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center rounded-lg px-2 transition hover:text-ring hover:bg-secondary hover:border"
                      >
                        <a href={item?.href} target="_blank">
                          {item?.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center border border-dashed p-3 bg-secondary rounded-lg text-sm">
                    <p>
                      Nenhum link de referencia vinculado ao presente.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <FormDestinatario />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("presentes");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}