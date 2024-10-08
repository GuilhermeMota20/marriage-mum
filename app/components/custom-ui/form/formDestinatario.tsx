"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { db, storage } from "@/app/services/Firebase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { StoreIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

const destinatarioFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "Seu nome deve conter no mínimo três caracteres." })
    .max(30, { message: "Seu nome deve conter no máximo 30 caracteres." }),
  file: z
    .instanceof(File)
    .refine((file) => file.type === 'image/png', {
      message: 'Somente arquivos PNG são aceitos.',
    }),
  mensagem: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "A mensagem deve conter no mínimo três caracteres." })
    .max(250, { message: "A mensagem deve conter no máximo 250 caracteres." }),
});

type DestinatarioFormValues = z.infer<typeof destinatarioFormSchema>;

export default function FormDestinatario() {
  const pathName = usePathname();
  const uuid = pathName?.split("/")?.pop();

  const { onCloseModalConfirmPresence } = useGlobalsVariables();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<DestinatarioFormValues>({
    resolver: zodResolver(destinatarioFormSchema),
    defaultValues: {
      username: "",
      file: undefined,
      mensagem: "",
    },
  });

  const onDrop = (file: File) => {
    form.setValue('file', file);
    setImagePreview(URL.createObjectURL(file));
  };

  async function onSubmit(data: DestinatarioFormValues) {
    setUploading(true);
    try {
      const storagePathRef = storageRef(storage, `images/${data.file.name}`);
      await uploadBytes(storagePathRef, data.file);
      const fileURL = await getDownloadURL(storagePathRef);

      const ref = collection(db, "giftDestinatario");
      const formData = {
        uuid,
        username: data.username,
        file: fileURL,
        mensagem: data.mensagem,
      };

      await addDoc(ref, formData);
      toast.success("Comprovante de doação enviada com sucesso! Muito obrigado.");
      onCloseModalConfirmPresence();
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      toast.error("Não foi possível comprovar sua doação! Por favor, tente novamente mais tarde.");
    } finally {
      setUploading(false);
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col gap-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <FormField
            control={form.control}
            name="file"
            render={({ fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="fileInput">Upload da nota fiscal</FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-sm w-full flex items-center justify-center cursor-pointer",
                      imagePreview ? "h-screen" : "h-full"
                    )}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files[0];
                      if (file) onDrop(file);
                    }}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      accept=".png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onDrop(file);
                        }
                      }}
                    />
                    {imagePreview ? (
                      <span className="absolute h-full w-full aspect-square overflow-hidden rounded-md border">
                        <Image src={imagePreview} fill alt="Preview" className="object-cover object-center" />
                      </span>
                    ) : (
                      <p>Arraste e solte um arquivo PNG aqui ou clique para selecionar</p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Somente arquivos do tipo PNG.
                </FormDescription>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 mt-12 md:mt-0">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mensagem"
              render={({ field, fieldState }) => (
                <>
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription className="flex items-center justify-between">
                      Descreva suas dúvidas aqui.
                      <span>{`${field?.value?.length}/250`}</span>
                    </FormDescription>
                    {fieldState.error ? (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    ) : null}
                  </FormItem>
                </>
              )}
            />

            <Button className="mt-4 bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg" type="submit" disabled={uploading}>
              {uploading ? "Enviando..." : <><StoreIcon className="mr-2 h-4 w-4" /><span>Presentear</span></>}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
