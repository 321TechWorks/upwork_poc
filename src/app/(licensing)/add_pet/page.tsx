import { Checkbox } from "@pp/app/(licensing)/_components/Checkbox";
import { Steps } from "@pp/app/(licensing)/_components/Steps";
import { StepPageLayout } from "@pp/app/(licensing)/_components/StepPageLayout";
import { StepsNavigation } from "@pp/app/(licensing)/_components/StepsNavigation";

import { PetSection } from "./_components/PetSection";
import { useLicense } from "../useLicense";
import { KeyValueBlock } from "../_components/KeyValueBlock";

export default async function AddPetPage({
  searchParams,
}: {
  searchParams?: { licenseId?: string };
}) {
  const { owner, pet, certificate } = await useLicense(searchParams?.licenseId);

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
            icon: <Checkbox disabled defaultChecked />,
            title: "Requirements Reviewed",
          },
          {
            id: "owner",
            disabled: true,
            icon: <Checkbox disabled defaultChecked />,
            title: "Pet Owner",
            content: (
              <div className="grid grid-cols-1 gap-4 px-[72px] sm:grid-cols-2">
                <div>
                  <KeyValueBlock
                    rows={[
                      { key: "Name:", value: owner?.name ?? "--" },
                      { key: "Email:", value: owner?.email ?? "--" },
                    ]}
                  />
                </div>
                <div>
                  <KeyValueBlock
                    rows={[
                      { key: "Address:", value: owner?.address ?? "--" },
                      {
                        key: "Phone Number:",
                        value: owner?.phone ?? "--",
                      },
                    ]}
                  />
                </div>
              </div>
            ),
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
