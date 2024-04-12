import * as z from "zod";

export const certificateSchema = z.object({
  rabiesVaccinationDate: z.date({
    required_error: "This field is required",
    invalid_type_error: "This field is required",
  }),
  rabiesVaccinationDuration: z.union([
    z.literal(1, {
      description: "1 Year",
      // errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal(3, {
      description: "3 Years",
      // errorMap: () => ({ message: "Select an option" }),
    }),
  ]),
  vetFacilityName: z.string().min(1, { message: "This field is required" }),
  vaccineProducer: z.string().optional(),
  vaccineLot: z.string().optional(),
  vaccineSerial: z.string().optional(),
  vaccineLotExperiation: z.string().optional(),
});

export type Certificate = z.infer<typeof certificateSchema>;
