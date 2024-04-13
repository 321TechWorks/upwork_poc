"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type Pet } from "@pp/domain/pet";
import { certificateSchema, type Certificate } from "@pp/domain/certificate";
import { Button } from "@pp/app/(licensing)/_components/Button";
import { Dialog } from "@pp/app/(licensing)/_components/Dialog";
import { Calendar } from "@pp/app/(licensing)/_components/Calendar";
import { Input } from "@pp/app/(licensing)/_components/Input";
import { Select } from "@pp/app/(licensing)/_components/Select";
import { InputError } from "@pp/app/(licensing)/_components/InputError";
import { submitMultipe } from "@pp/app/(licensing)/_utils/form";
import { useState } from "react";
import { usePetForm } from "./usePetForm";

type Props = {
  onSave: (resultss: [pet: Pet, certificate: Certificate]) => void;
};

export function CantFindFlow({ onSave }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [petForm, petFormElement] = usePetForm();

  const certificateForm = useForm<Certificate>({
    defaultValues: {
      rabiesVaccinationDate: null,
      rabiesVaccinationDuration: "",
      vetFacilityName: "",
      vaccineLot: "",
      vaccineLotExperiation: "",
      vaccineProducer: "",
      vaccineSerial: "",
    } as unknown as Certificate,
    resolver: zodResolver(certificateSchema),
  });

  const closeAndReset = () => {
    setOpen(false);
    petForm.reset();
    certificateForm.reset();
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        I can&apos;t find certificate
      </Button>
      <Dialog
        open={open}
        title="Rabies Vaccination Certificate"
        onClose={() => {
          closeAndReset();
        }}
      >
        <div className="flex flex-col space-y-4 sm:w-[500px] md:w-[700px] lg:min-w-[900px]">
          {petFormElement}
          <div className="flex flex-col space-y-4">
            <h3 className="font-black">Vaccination Info</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <Controller
                  control={certificateForm.control}
                  name="rabiesVaccinationDate"
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
              <div>
                <Controller
                  control={certificateForm.control}
                  name="rabiesVaccinationDuration"
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        className="w-full"
                        placeholder="Select Rabies Vaccination Duration"
                        options={
                          certificateSchema.shape.rabiesVaccinationDuration
                            .options
                        }
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(parseInt(value));
                        }}
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
                  control={certificateForm.control}
                  name="vetFacilityName"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        className="w-full"
                        placeholder="Vet Facility Name"
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
                  control={certificateForm.control}
                  name="vaccineProducer"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        className="w-full"
                        placeholder="Vaccine Producer (Optional)"
                        value={field.value ?? ""}
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
                  control={certificateForm.control}
                  name="vaccineLot"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        className="w-full"
                        placeholder="Vaccine Lot (Optional)"
                        value={field.value ?? ""}
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
                  control={certificateForm.control}
                  name="vaccineSerial"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        className="w-full"
                        placeholder="Vaccine Serial (Optional)"
                        value={field.value ?? ""}
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
                  control={certificateForm.control}
                  name="vaccineLotExperiation"
                  render={({ field, fieldState }) => (
                    <>
                      <Calendar
                        className="w-full"
                        // placeholder="Vaccine Lot Experiation (Optional)"
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
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                closeAndReset();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-900 text-white"
              onClick={submitMultipe(
                petForm,
                certificateForm,
              )((data) => {
                onSave(data);
                closeAndReset();
              })}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
