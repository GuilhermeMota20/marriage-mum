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
import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDoc, collection } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { db } from "@/app/services/Firebase"
import { z } from "zod"
import { ButtonPrimary } from "../buttonPrimary"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Campo obrigatório"
    })
    .min(3, {
      message: "Seu nome deve conter no minimo tres caracteres.",
    })
    .max(30, {
      message: "Seu nome deve conter no maximo 30 caracteres.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function FormConfirmPresenca() {
  const { onCloseModalConfirmPresence } = useGlobalsVariables();

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const ref = collection(db, "guests");
      const formData = {
        username: data?.username,
      };

      await addDoc(ref, formData);

      toast.success("Presença confirmada com sucesso!");
      onCloseModalConfirmPresence();
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      toast.error(
        "Não foi possível confirmar sua presença! Por favor, tente novamente mais tarde."
      );
    };
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome completo" {...field} />
                </FormControl>
                <FormDescription>
                  Seu nome ficara disponivel em uma lista para que os organizadores possam ter ciencia de quem estara presente antecipadamente.
                </FormDescription>
                {fieldState.error ? (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                ) : null}
              </FormItem>
            )}
          />

          <ButtonPrimary type="submit" />
        </form>
      </Form>
    </>
  )
}