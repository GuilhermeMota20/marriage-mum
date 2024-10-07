"use client"

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
import { db } from "@/app/services/Firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { StoreIcon } from "lucide-react";
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
  const { onCloseModalConfirmPresence } = useGlobalsVariables();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<DestinatarioFormValues>({
    resolver: zodResolver(destinatarioFormSchema),
    defaultValues: {
      username: "",
      file: undefined,
      mensagem: ""
    },
  });

  const onDrop = (file: File) => {
    form.setValue('file', file);
    setImagePreview(URL.createObjectURL(file)); // Gera um link temporário da imagem
  };

  async function onSubmit(data: DestinatarioFormValues) {
    try {
      const ref = collection(db, "giftDestinatario");
      const formData = {
        username: data.username,
        file: imagePreview, // data.file.name, // Aqui você pode adicionar lógica para salvar o arquivo no Firestore se necessário
        mensagem: data.mensagem,
      };

      console.log("Tentando adicionar documento...", formData);
      await addDoc(ref, formData);

      console.log("Documento adicionado com sucesso");
      toast.success("Presença confirmada com sucesso!");
      onCloseModalConfirmPresence();
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
      toast.error(
        "Não foi possível confirmar sua presença! Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col gap-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="fileInput">Upload da nota fiscal</FormLabel>
                  <FormControl>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-sm w-full h-full flex items-center justify-center cursor-pointer"
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
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                        Descreva suas duvidas aqui.
                        <span>{`${field?.value?.length}/250`}</span>
                      </FormDescription>
                      {fieldState.error ? (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      ) : null}
                    </FormItem>
                  </>
                )}
              />

              <Button className="mt-4 bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg" type="submit">
                <StoreIcon className="mr-2 h-4 w-4" />
                <span>
                  Presentear
                </span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
