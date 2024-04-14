import Link from "next/link";

import { licenseFees } from "@pp/domain/fees";
import { Button } from "@pp/app/(licensing)/_components/Button";
import { Checkbox } from "@pp/app/(licensing)/_components/Checkbox";
import { Steps } from "@pp/app/(licensing)/_components/Steps";

import { StepsNavigation } from "../_components/StepsNavigation";
import { StepPageLayout } from "../_components/StepPageLayout";
import { StepContent } from "../_components/StepContent";

export default async function ReviewRequirementsPage({
  searchParams,
}: {
  searchParams?: { licenseId?: string };
}) {
  return (
    <StepPageLayout
      progress={
        <StepsNavigation
          active="review"
          steps={[
            { id: "review", title: "Requirements Reviewed" },
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
        defaultValue={["review"]}
        steps={[
          {
            id: "review",
            icon: <Checkbox disabled />,
            title: "Requirements Reviewed",
            content: (
              <StepContent>
                <h3>Licensing Ordinance</h3>
                <span>
                  All dogs, cats, and ferrets 4 months of age and older must be
                  licensed in Brevard County.
                </span>
                <span>
                  Brevard County, Florida - Code of Ordinances Chapter 14 -
                  Animals
                </span>
                <h3>Phone</h3>
                <span>
                  Please have the required documents with you when you phone.
                  You will then need to email, fax or mail copies of the
                  required documents and payment method. Please call
                  1.844.738.2426 or 321.204.7030
                </span>
                <h3>Required Documents</h3>
                <span>
                  Please have your rabies vaccination certificate and a letter
                  from the vet showing your pet&apos;s spayed/neutered status
                  available. If your pet has a medical rabies waiver from your
                  vet, please have that available as an alternative to a rabies
                  vaccination certificate.
                </span>
                <div>
                  <h3>Licenses Fees</h3>
                  <span>1 Year</span>
                </div>
                {Object.keys(licenseFees).map((petType) => (
                  <table
                    key={petType}
                    className="border-collapse border border-red-50"
                  >
                    <thead>
                      <tr className="bg-red-50 text-left">
                        <th className="w-1/2 border border-red-50 p-4">
                          {petType}
                        </th>
                        <th className="w-1/2 border border-red-50 p-4">
                          PRICE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        licenseFees[petType as keyof typeof licenseFees],
                      ).map(([entry, price]) => (
                        <tr key={petType + entry + String(price)}>
                          <td className="w-1/2 border border-red-50 p-4">
                            {entry}
                          </td>
                          <td className="w-1/2 border border-red-50 p-4">
                            ${String(price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}

                <div className="flex justify-between">
                  <Link
                    className="ml-auto "
                    href={{
                      pathname: "/add_pet",
                      search: new URLSearchParams({
                        licenseId: searchParams?.licenseId ?? "",
                      }).toString(),
                    }}
                  >
                    <Button className="border-red-primary bg-red-primary text-white">
                      Continue
                    </Button>
                  </Link>
                </div>
              </StepContent>
            ),
          },
        ]}
      />
    </StepPageLayout>
  );
}
