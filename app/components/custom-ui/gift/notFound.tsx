import { PackageOpen } from "lucide-react";

export const NotFound = () => {
  return (
    <>
      <div className="w-full p-16 border border-dashed flex flex-col gap-8 items-center justify-center">
        <PackageOpen strokeWidth={0.5} className="h-32 w-32" />
        <p>Nenhum presente encontrado no momento. Ttnte novamente mais tarde ou</p>
        <p>entre em contato com nosso suporte.</p>
      </div>
    </>
  )
};