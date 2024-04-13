import { api } from "@pp/trpc/server";
import { Button } from "@pp/app/(licensing)/_components/Button";
import { Checkbox } from "@pp/app/(licensing)/_components/Checkbox";
import { Steps } from "@pp/app/(licensing)/_components/Steps";
import { type Pet } from "@pp/domain/pet";

import { PetSection } from "./_components/PetSection";
import { type Certificate } from "@pp/domain/certificate";

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
    <div className="mx-48">
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
              <PetSection defaultPet={pet} defaultCertificate={certificate} />
            ),
          },
        ]}
      />
    </div>
  );
}
