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

export default async function LicensePetPage({
  searchParams,
}: {
  searchParams?: { licenseId?: string };
}) {
  const [pet, certificate] = await useLicense(searchParams?.licenseId);

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
          },
          {
            id: "pet",
            disabled: true,
            icon: <Checkbox disabled defaultChecked />,
            title: "Pet added",
            summary: (
              <div className="ml-[170px] flex space-x-[53px]">
                {pet && (
                  <div className="flex space-x-2">
                    <span>
                      {petSchema.shape.type.options.find(
                        (o) => o.value === pet.type,
                      )?.description ?? "Unknown"}
                    </span>
                    <div>|</div>
                    <span>{pet.name}</span>
                  </div>
                )}
                {certificate && (
                  <div className="flex space-x-2">
                    <span>VAC</span>
                    <div>|</div>
                    <span>
                      {String(
                        new Intl.DateTimeFormat("en-US").format(
                          certificate.rabiesVaccinationDate,
                        ),
                      )}
                    </span>
                  </div>
                )}
              </div>
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
                  <Button className="border-gray-50 bg-gray-50">
                    Add to Cart
                  </Button>
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
                                new Date(),
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
                                ((d) => d.setFullYear(d.getFullYear() + 1))(
                                  new Date(),
                                ),
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
