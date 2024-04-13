import * as z from "zod";

export const ownerSchema = z.object({
  name: z.string(),
});

export type Owner = z.infer<typeof ownerSchema>;
