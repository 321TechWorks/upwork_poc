"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { petSchema, type Pet } from "@pp/domain/pet";
import { Calendar } from "@pp/app/_components/Calendar";
import { Input } from "@pp/app/_components/Input";
import { Section } from "@pp/app/_components/Section";
import { Select } from "@pp/app/_components/Select";
import { InputError } from "@pp/app/_components/InputError";

export function usePetForm() {
  const petForm = useForm<Pet>({
    criteriaMode: "all",
    defaultValues: {
      photo: "",
      type: "",
      weight: "",
      name: "",
      color: "",
      gender: "",
      microchipTagNumber: "",
      dateOfBirth: null,
      waivedIssuedDate: null,
    } as unknown as Pet,
    resolver: zodResolver(petSchema),
  });

  const formElement = (
    <div className="flex flex-col space-y-4">
      <h3 className="font-black">Pet Info</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="row-span-4">
          <Section className="h-full">Photo</Section>
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="type"
            render={({ field, fieldState }) => (
              <>
                <Select
                  className="w-full"
                  placeholder="Select Type"
                  options={petSchema.shape.type.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="weight"
            render={({ field, fieldState }) => (
              <>
                <Select
                  className="w-full"
                  placeholder="Select Weight"
                  options={petSchema.shape.weight.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="name"
            render={({ field, fieldState }) => (
              <>
                <Input
                  className="w-full"
                  placeholder="Name"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="color"
            render={({ field, fieldState }) => (
              <>
                <Select
                  className="w-full"
                  placeholder="Select Color"
                  options={petSchema.shape.color.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="gender"
            render={({ field, fieldState }) => (
              <>
                <Select
                  className="w-full"
                  placeholder="Select Pet Gender"
                  options={petSchema.shape.gender.options}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="microchipTagNumber"
            render={({ field, fieldState }) => (
              <>
                <Input
                  className="w-full"
                  placeholder="Microchip Tag Number"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            control={petForm.control}
            name="dateOfBirth"
            render={({ field, fieldState }) => (
              <>
                <Calendar
                  className="w-full"
                  // placeholder="Color"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
        <div className="sm:col-span-2 md:col-span-3">
          <Controller
            control={petForm.control}
            name="waivedIssuedDate"
            render={({ field, fieldState }) => (
              <>
                <Calendar
                  className="w-full"
                  // placeholder="Color"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <InputError>{fieldState.error.message}</InputError>
                )}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );

  return [petForm, formElement] as const;
}
