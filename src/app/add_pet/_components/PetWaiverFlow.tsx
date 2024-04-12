"use client";

import { type Pet } from "@pp/domain/pet";
import { Button } from "@pp/app/_components/Button";
import { Dialog } from "@pp/app/_components/Dialog";
import { useState } from "react";
import { usePetForm } from "./usePetForm";

type Props = {
  onSave: (resultss: [pet: Pet]) => void;
};

export function PetWaiverFlow({ onSave }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [petForm, petFormElement] = usePetForm();

  const closeAndReset = () => {
    setOpen(false);
    petForm.reset();
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
              onClick={petForm.handleSubmit((data) => {
                onSave([data]);
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
