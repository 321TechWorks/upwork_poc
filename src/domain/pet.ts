import * as z from "zod";

export const petSchema = z.object({
  id: z.number().optional(),
  photo: z.string().optional(),
  type: z.union([
    z.literal("dog", {
      description: "Dog",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("cat", {
      description: "Cat",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("ferret", {
      description: "Ferret",
      errorMap: () => ({ message: "Select an option" }),
    }),
  ]),
  weight: z.union([
    z.literal("under20", {
      description: "Under 20 lbs",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("20-50", {
      description: "20-50 lbs",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("over50", {
      description: "Over 50 lbs",
      errorMap: () => ({ message: "Select an option" }),
    }),
  ]),
  name: z
    .string({
      required_error: "This field is required",
    })
    .min(1, { message: "This field is required" }),
  color: z.union([
    z.literal("white", {
      description: "White",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("black", {
      description: "Black",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("grey", {
      description: "Grey",
      errorMap: () => ({ message: "Select an option" }),
    }),
  ]),
  gender: z.union([
    z.literal("spayedFemale", {
      description: "Spayed Female",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("neuteredMale", {
      description: "Neutered Male",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("intactFemale", {
      description: "Intact Female",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("intactMale", {
      description: "Intact Male",
      errorMap: () => ({ message: "Select an option" }),
    }),
    z.literal("unknown", {
      description: "Unknown",
      errorMap: () => ({ message: "Select an option" }),
    }),
  ]),
  microchipTagNumber: z
    .string({
      required_error: "This field is required",
    })
    .min(1, { message: "This field is required" }),
  dateOfBirth: z.date({
    required_error: "This field is required",
    invalid_type_error: "This field is required",
  }),
  waivedIssuedDate: z.date({
    required_error: "This field is required",
    invalid_type_error: "This field is required",
  }),
});

export type Pet = z.infer<typeof petSchema>;
