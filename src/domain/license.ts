import * as z from "zod";

export const licenseSchema = z.object({
  date: z.date(),
  expire: z.date(),
});

export type License = z.infer<typeof licenseSchema>;
