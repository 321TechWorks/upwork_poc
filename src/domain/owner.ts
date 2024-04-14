import * as z from "zod";

export const ownerSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
});

export type Owner = z.infer<typeof ownerSchema>;
