"use client";

import { petSchema, type Pet } from "@pp/domain/pet";
import { certificateSchema, type Certificate } from "@pp/domain/certificate";
import { Section } from "@pp/app/(licensing)/_components/Section";
import { Button } from "@pp/app/(licensing)/_components/Button";

import { createLicense } from "../../actions/createLicense";

import { CantFindFlow } from "./CantFindFlow";
import { PetWaiverFlow } from "./PetWaiverFlow";
import { useState } from "react";
import { KeyValueBlock } from "../../_components/KeyValueBlock";

type Props = {
  defaultPet?: Pet | null;
  defaultCertificate?: Certificate | null;
};

export function PetSection({ defaultPet, defaultCertificate }: Props) {
  const [pet, setPet] = useState(defaultPet);
  const [certificate, setCertificate] = useState(defaultCertificate);

  let content;
  if (pet) {
    content = (
      <div className="flex w-full flex-col space-y-4">
        <h3>Pet Info</h3>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="row-span-4">PHOTO</div>
          <div>
            <KeyValueBlock
              className="w-full"
              rows={[
                {
                  key: "Type",
                  value:
                    petSchema.shape.type.options.find(
                      (o) => o.value === pet.type,
                    )?.description ?? "Unknown",
                },
                {
                  key: "Name",
                  value: pet.name,
                },
                {
                  key: "Gender",
                  value:
                    petSchema.shape.gender.options.find(
                      (o) => o.value === pet.gender,
                    )?.description ?? "Unknown",
                },
                {
                  key: "Date of birth",
                  value: String(
                    new Intl.DateTimeFormat("en-US").format(pet.dateOfBirth),
                  ),
                },
              ]}
            />
          </div>
          <div>
            <KeyValueBlock
              className="w-full"
              rows={[
                {
                  key: "Weight",
                  value:
                    petSchema.shape.weight.options.find(
                      (o) => o.value === pet.weight,
                    )?.description ?? "Unknown",
                },
                {
                  key: "Color",
                  value:
                    petSchema.shape.color.options.find(
                      (o) => o.value === pet.color,
                    )?.description ?? "Unknown",
                },
                { key: "Microchip Tag Number", value: pet.microchipTagNumber },
              ]}
            />
          </div>
        </div>
        {certificate && (
          <>
            <h3>Vaccination Info</h3>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="row-span-4">PHOTO</div>
              <div>
                <KeyValueBlock
                  className="w-full"
                  rows={[
                    {
                      key: "Rabies Vaccination Date",
                      value: String(
                        new Intl.DateTimeFormat("en-US").format(
                          certificate.rabiesVaccinationDate,
                        ),
                      ),
                    },
                    {
                      key: "Rabies Vaccination Duration",
                      value:
                        certificateSchema.shape.rabiesVaccinationDuration.options.find(
                          (o) =>
                            o.value === certificate.rabiesVaccinationDuration,
                        )?.description ?? "Unknown",
                    },
                    {
                      key: "Vet Facility Name",
                      value: certificate.vetFacilityName,
                    },
                    {
                      key: "Vaccine Producer",
                      value: certificate.vaccineProducer ?? "--",
                    },
                  ]}
                />
              </div>
              <div>
                <KeyValueBlock
                  className="w-full"
                  rows={[
                    {
                      key: "Vaccine Lot",
                      value: certificate.vaccineLot ?? "--",
                    },
                    {
                      key: "Vaccine Serial",
                      value: certificate.vaccineSerial ?? "--",
                    },
                    {
                      key: "Vaccine Lot Experiationr",
                      value: certificate.vaccineLotExperiation
                        ? String(
                            new Intl.DateTimeFormat("en-US").format(
                              certificate.vaccineLotExperiation,
                            ),
                          )
                        : "--",
                    },
                  ]}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    content = (
      <>
        <CantFindFlow onSave={createLicense} />
        <PetWaiverFlow
          onSave={([pet]) => {
            console.log(pet);
          }}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col space-y-4 bg-white p-8">
      <Section className="flex flex-col space-y-4 p-4">
        <h3>Rabies Vaccination Certificate</h3>
        <div className="flex w-full space-x-4">{content}</div>
      </Section>
      <div className="flex justify-between">
        <Button className="bg-transparent rounded-md border border-gray-200">
          Back
        </Button>
        <Button className="bg-red-900 text-white" disabled={!pet}>
          Continue
        </Button>
      </div>
    </div>
  );
}
