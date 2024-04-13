import * as z from "zod";

export const licenseSchema = z.object({
  licenseDate: z.date(),
  expiriation: z.date(),
  fee: z.number(),
  isComplete: z.boolean().default(false),
});
