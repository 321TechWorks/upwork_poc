"use client";

import { Button } from "@pp/app/_components/Button";
import { Dialog } from "@pp/app/_components/Dialog";
import { Calendar } from "@pp/app/_components/Calendar";
import { Input } from "@pp/app/_components/Input";
import { Section } from "@pp/app/_components/Section";
import { Select } from "@pp/app/_components/Select";

export function CantFindFlow() {
  return (
    <Dialog
      title="Rabies Vaccination Certificate"
      content={(renderClose) => (
        <div className="flex flex-col space-y-4 sm:w-[500px] md:w-[700px] lg:min-w-[900px]">
          <div className="flex flex-col space-y-4">
            <h3 className="font-black">Pet Info</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="row-span-4">
                <Section className="h-full">Photo</Section>
              </div>
              <div>
                <Select
                  className="w-full"
                  placeholder="Select Type"
                  options={[
                    { value: "dog", label: "Dog" },
                    { value: "cat", label: "Cat" },
                    { value: "ferret", label: "Ferret" },
                  ]}
                />
              </div>
              <div>
                <Select
                  className="w-full"
                  placeholder="Weight"
                  options={[
                    { value: "under20", label: "Under 20 lbs" },
                    { value: "20-50", label: "20-50 lbs" },
                    { value: "over50", label: "Over 50 lbs" },
                  ]}
                />
              </div>
              <div>
                <Input className="w-full" placeholder="Name" />
              </div>
              <div>
                <Select
                  className="w-full"
                  placeholder="Color"
                  options={[
                    { value: "white", label: "White" },
                    { value: "black", label: "Black" },
                    { value: "grey", label: "Grey" },
                  ]}
                />
              </div>
              <div>
                <Select
                  className="w-full"
                  placeholder="Pet Gender"
                  options={[
                    { value: "spayedFemale", label: "Spayed Female" },
                    { value: "neuteredMale", label: "Neutered Male" },
                    { value: "intactFemale", label: "Intact Female" },
                    { value: "intactMale", label: "Intact Male" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
              </div>
              <div>
                <Input className="w-full" placeholder="Microchip Tag Number" />
              </div>
              <div>
                <Calendar className="w-full" />
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <Calendar className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-black">Vaccination Info</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <Calendar className="w-full" />
              </div>
              <div>
                <Select
                  className="w-full"
                  placeholder="Rabies Vaccination Duration"
                  options={[
                    { value: "1", label: "1 Year" },
                    { value: "3", label: "3 Year" },
                  ]}
                />
              </div>
              <div>
                <Input className="w-full" placeholder="Vet Facility Name" />
              </div>
              <div>
                <Input
                  className="w-full"
                  placeholder="Vaccine Producer (Optional)"
                />
              </div>
              <div>
                <Input
                  className="w-full"
                  placeholder="Vaccine Lot (Optional)"
                />
              </div>
              <div>
                <Input
                  className="w-full"
                  placeholder="Vaccine Serial (Optional)"
                />
              </div>
              <div>
                <Input
                  className="w-full"
                  placeholder="Vaccine Lot Experiation (Optional)"
                />
              </div>
            </div>
          </div>
          {renderClose(<Button className="bg-red-900 text-white">Save</Button>)}
        </div>
      )}
    >
      <Button>I can&apos;t find certificate</Button>
    </Dialog>
  );
}
