import { api } from "@pp/trpc/server";
import { type Pet } from "@pp/domain/pet";
import { type Certificate } from "@pp/domain/certificate";
import { Checkbox } from "@pp/app/(licensing)/_components/Checkbox";
import { Steps } from "@pp/app/(licensing)/_components/Steps";
import { StepPageLayout } from "@pp/app/(licensing)/_components/StepPageLayout";
import { StepsNavigation } from "@pp/app/(licensing)/_components/StepsNavigation";

import { PetSection } from "./_components/PetSection";

export default async function AddPetPage({
  searchParams,
}: {
  searchParams?: { licenseId?: string };
}) {
  let pet: Pet | null = null;
  let certificate: Certificate | null = null;

  if (searchParams?.licenseId) {
    const license = await api.license.getLicensesById({
      id: parseInt(searchParams.licenseId),
    });

    pet = license.pet;
    certificate = license.certificate;
  }
  return (
    <StepPageLayout
      progress={
        <StepsNavigation
          active="pet"
          steps={[
            {
              id: "review",
              title: "Requirements Reviewed",
              link: {
                pathname: "/review_requirements",
                search: new URLSearchParams({
                  licenseId: searchParams?.licenseId ?? "",
                }).toString(),
              },
            },
            { id: "pet", title: "Add Pet" },
            { id: "license", title: "License Pet" },
          ]}
        />
      }
    >
      <Steps
        defaultValue={["owner", "pet"]}
        steps={[
          {
            id: "review",
            disabled: true,
            icon: <Checkbox defaultChecked />,
            title: "Requirements Reviewed",
            content: "Requirements Reviewed",
          },
          {
            id: "owner",
            disabled: true,
            icon: <Checkbox defaultChecked />,
            title: "Pet Owner",
            content: "Pet Owner",
          },
          {
            id: "pet",
            icon: <Checkbox disabled />,
            title: "Add Pet",
            content: (
              <PetSection
                licenseId={searchParams?.licenseId}
                defaultPet={pet}
                defaultCertificate={certificate}
              />
            ),
          },
        ]}
      />
    </StepPageLayout>
  );
}
