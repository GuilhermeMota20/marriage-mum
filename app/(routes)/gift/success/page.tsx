/* eslint-disable react/no-unescaped-entities */
import { ButtonPrev } from "@/app/components/custom-ui/buttonPrev";
import { Footer } from "@/app/components/custom-ui/footer";
import { PackageCheckIcon, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Doação realizada",
    description: "Parabens sua doação foi relizada com sucesso!",
  };
}

export default async function Page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-[#F4F4F4] h-100 flex flex-col items-center rounded-md">
      <div className="bg-white w-full border-b px-2 md:px-24 py-4 flex items-center justify-center rounded-t-lg text-xs">
        <ShieldCheck className="mr-4" />
        Aqui você tem 100% de privacidade; todas as suas informações estão completamente seguras.
      </div>

      <main className="flex flex-col p-3 md:p-8 lg:p-24 gap-8 w-full items-center sm:items-start mb-16">
        <ButtonPrev />

        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <PackageCheckIcon className="w-32 h-32" />
          <p>
            Sua doação foi concluída com sucesso! Agradecemos de coração <br />
            e esperamos contar com sua presença no nosso grande dia.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}