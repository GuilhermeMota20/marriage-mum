import { z } from "zod"

export const guestSchema = z.object({
  id: z.string(),
  username: z.string(),
  createdAt: z.string(),
});
export type Guest = z.infer<typeof guestSchema>;

export const giftSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  username: z.string(),
  mensagem: z.string(),
  createdAt: z.string(),
  file: z.string(),
});
export type Gift = z.infer<typeof giftSchema>;
