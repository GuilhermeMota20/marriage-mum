"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { ContactPhone } from "@/app/types/contactPhone"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Textarea } from "../../ui/textarea"
import { MoveRightIcon } from "lucide-react"

interface Props {
  listContact: ContactPhone[];
};

type EmailFormSchema = z.infer<typeof emailFormSchema>;

const emailFormSchema = z.object({
  para: z.string().min(1, { message: "Selecione um destinatário" }),
  email: z.string().email({ message: "E-mail inválido" }),
  assunto: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "O assunto deve conter no mínimo três caracteres." })
    .max(30, { message: "O assunto deve conter no máximo 30 caracteres." }),
  mensagem: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "A mensagem deve conter no mínimo três caracteres." })
    .max(250, { message: "A mensagem deve conter no máximo 250 caracteres." }),
});

export default function FormContactMail({
  listContact,
}: Props) {
  const form = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      para: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormSchema> = async (formData) => {
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`E-mail enviado`);
      } else {
        toast.error(`Erro ao enviar email: ${data.error}`);
      }
    } catch (error) {
      toast.error(`Erro inesperado ao enviar o email: ${error}`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="para"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Para</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um destinatário" />
                    </SelectTrigger>
                    <SelectContent>
                      {listContact && listContact.length > 0 ? (
                        listContact.map((item, index) => (
                          <SelectItem key={index} value={item.email}>
                            <div className="flex items-center gap-4">
                              <span className="font-bold">({item.type})</span>
                              <span className="font-bold">{item?.name}</span>
                              <span>{item.email}</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-contacts" disabled>
                          Nenhum contato disponível
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <>
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o e-mail que deseja utilizar" {...field} />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  ) : null}
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="assunto"
            render={({ field, fieldState }) => (
              <>
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o tema do assunto" {...field} />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  ) : null}
                </FormItem>
              </>
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

          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              variant="secondary"
            >
              Enviar
              <MoveRightIcon className="text-[#49516F] w-4 h h-4 ms-2" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}