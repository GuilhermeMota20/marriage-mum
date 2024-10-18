"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { useGlobalsVariables } from "@/app/hooks/useGlobalsVariables";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import Modal from "./modal";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import useAdmVariables from "@/app/hooks/useAdmVariable";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const expectedPin = process.env.NEXT_PUBLIC_PIN_ACCESS!;

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Sua senha deve conter 6 caracteres.",
  })
    .refine(value => value === expectedPin, {
      message: "O PIN não é válido.",
    }),
})

export function ModalPinAccess() {
  const { isOpenModalPinAccess, onCloseModalPinAccess } = useGlobalsVariables();
  const { setDataAdm, dataAdm } = useAdmVariables();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    setLoading(true);
    setDataAdm({
      isLogged: true
    });
  };

  useEffect(() => {
    if (dataAdm?.isLogged) {
      onCloseModalPinAccess();
      router?.push("/dashboard");
    };
  }, [dataAdm?.isLogged, onCloseModalPinAccess, router]);

  return (
    <>
      {isOpenModalPinAccess ? (
        <Modal
          title="Digite sua senha"
          description="Digite sua senha para acesar o painel administrativos."
          onClose={onCloseModalPinAccess}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="ww-full flex flex-col items-center justify-center space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-center justify-center">
                    <FormControl className="w-full flex items-center justify-center">
                      <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS} maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} inputMode="text" />
                          <InputOTPSlot index={1} inputMode="text" />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={2} inputMode="text" />
                          <InputOTPSlot index={3} inputMode="text" />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={4} inputMode="text" />
                          <InputOTPSlot index={5} inputMode="text" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4 bg-[#607A53] hover:bg-[#607A53] hover:brightness-90 shadow-lg" type="submit" disabled={loading}>
                {
                  loading
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /><span>Validando credencial...</span></>
                    : <><span>Entrar</span></>
                }
              </Button>
            </form>
          </Form>
        </Modal>
      ) : null}
    </>
  )
}
