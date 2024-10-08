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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  };

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
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Entrar</Button>
            </form>
          </Form>
        </Modal>
      ) : null}
    </>
  )
}
