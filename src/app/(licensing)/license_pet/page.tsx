import { Button } from "@pp/app/(licensing)/_components/Button";
import { Checkbox } from "@pp/app/(licensing)/_components/Checkbox";
import { Steps } from "@pp/app/(licensing)/_components/Steps";

import { StepsNavigation } from "../_components/StepsNavigation";
import { StepPageLayout } from "../_components/StepPageLayout";
import { StepContent } from "../_components/StepContent";
import { Section } from "../_components/Section";
import { KeyValueBlock } from "../_components/KeyValueBlock";
import { useLicense } from "../useLicense";
import { petSchema } from "@pp/domain/pet";
import { StepSummary } from "../_components/StepSummary";
import { AddToCartButton } from "./_component/AddToCartButton";

export default async function LicensePetPage({
  searchParams,
}: {
  searchParams?: { licenseId?: string };
}) {
  const { pet, owner, certificate, license } = await useLicense(
    searchParams?.licenseId,
  );

  return (
    <StepPageLayout
      progress={
        <StepsNavigation
          active="license"
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
            {
              id: "pet",
              title: "Add Pet",
              link: {
                pathname: "/add_pet",
                search: new URLSearchParams({
                  licenseId: searchParams?.licenseId ?? "",
                }).toString(),
              },
            },
            { id: "license", title: "License Pet" },
          ]}
        />
      }
    >
      <Steps
        defaultValue={["license"]}
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
            summary: (
              <StepSummary
                className="ml-[20px] md:ml-[50px] lg:ml-[100px] xl:ml-[170px]"
                entries={[
                  owner && {
                    key: owner.name,
                    value: owner.address,
                  },
                ]}
              />
            ),
          },
          {
            id: "pet",
            disabled: true,
            icon: <Checkbox disabled defaultChecked />,
            title: "Pet added",
            summary: (
              <StepSummary
                className="ml-[20px] md:ml-[50px] lg:ml-[100px] xl:ml-[170px]"
                entries={[
                  pet && {
                    key:
                      petSchema.shape.type.options.find(
                        (o) => o.value === pet.type,
                      )?.description ?? "Unknown",
                    value: pet.name,
                  },
                  certificate && {
                    key: "VAC",
                    value: String(
                      new Intl.DateTimeFormat("en-US").format(
                        certificate.rabiesVaccinationDate,
                      ),
                    ),
                  },
                ]}
              />
            ),
          },
          {
            id: "license",
            icon: <Checkbox disabled />,
            title: "License Pet",
            content: (
              <StepContent>
                <div className="flex justify-center space-x-4">
                  <Button className="border-gray-50 bg-gray-50">
                    Play Online
                  </Button>
                  <Button className="border-gray-50 bg-gray-50">
                    Pay by Check
                  </Button>
                  <AddToCartButton licenseId={searchParams?.licenseId} />
                </div>
                <Section>
                  <div className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-3">
                    <div>
                      <KeyValueBlock
                        className="w-full"
                        rows={[
                          {
                            key: "License Date:",
                            value: String(
                              new Intl.DateTimeFormat("en-US").format(
                                license?.date,
                              ),
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
                            key: "Expiriation",
                            value: String(
                              new Intl.DateTimeFormat("en-US").format(
                                license?.expire,
                              ),
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
                            key: "Fee",
                            value: "$300",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </Section>
                <Section
                  closable
                  className="border-[#F7F5B6] bg-[#F7F5B6] p-4 text-center"
                >
                  The license fee must be paid before the license is complete.
                </Section>
              </StepContent>
            ),
          },
        ]}
      />
    </StepPageLayout>
  );
}
