import { z } from "zod"

export const guestSchema = z.object({
  id: z.string(),
  username: z.string(),
  createdAt: z.string(),
});
export type Guest = z.infer<typeof guestSchema>;

export const giftSchema = z.object({
  id: z.string().optional(),
  uuid: z.string().optional(),
  username: z.string().optional(),
  mensagem: z.string().optional(),
  createdAt: z.string().optional(),
  file: z.string().optional(),
});
export type Gift = z.infer<typeof giftSchema>;
