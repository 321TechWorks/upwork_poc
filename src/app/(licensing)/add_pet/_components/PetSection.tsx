"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { petSchema, type Pet } from "@pp/domain/pet";
import { certificateSchema, type Certificate } from "@pp/domain/certificate";
import { Section } from "@pp/app/(licensing)/_components/Section";
import { Button } from "@pp/app/(licensing)/_components/Button";
import { KeyValueBlock } from "@pp/app/(licensing)/_components/KeyValueBlock";
import { StepContent } from "@pp/app/(licensing)/_components/StepContent";

import { createLicense } from "../../actions/createLicense";

import { CantFindFlow } from "./CantFindFlow";
import { PetWaiverFlow } from "./PetWaiverFlow";

type Props = {
  licenseId?: string;
  defaultPet?: Pet | null;
  defaultCertificate?: Certificate | null;
};

export function PetSection({
  licenseId,
  defaultPet,
  defaultCertificate,
}: Props) {
  const router = useRouter();

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
        <CantFindFlow
          onSave={([pet, certificate]) => {
            setPet(pet);
            setCertificate(certificate);
          }}
        />
        <PetWaiverFlow
          onSave={([pet]) => {
            setPet(pet);
          }}
        />
      </>
    );
  }

  return (
    <StepContent>
      <Section className="flex flex-col space-y-4 p-4">
        <h3>Rabies Vaccination Certificate</h3>
        <div className="flex w-full space-x-4">{content}</div>
      </Section>
      <div className="flex justify-between">
        <Link
          href={{
            pathname: "/review_requirements",
            search: new URLSearchParams({
              licenseId: licenseId ?? "",
            }).toString(),
          }}
        >
          <Button>Back</Button>
        </Link>

        <Button
          className="bg-red-primary border-red-primary text-white"
          disabled={!pet}
          onClick={async () => {
            const license =
              !licenseId && pet && certificate
                ? await createLicense([pet, certificate])
                : { id: licenseId ?? "" };

            router.push(
              `/license_pet?${new URLSearchParams({
                licenseId: String(license.id),
              }).toString()}`,
            );
          }}
        >
          Continue
        </Button>
      </div>
    </StepContent>
  );
}
