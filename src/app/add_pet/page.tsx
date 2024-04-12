"use client";

import { Button } from "@pp/app/_components/Button";
import { Checkbox } from "@pp/app/_components/Checkbox";
import { Section } from "@pp/app/_components/Section";
import { Steps } from "@pp/app/_components/Steps";
import { CantFindFlow } from "./_components/CantFindFlow";
import { PetWaiverFlow } from "./_components/PetWaiverFlow";

export default function AddPetPage() {
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
              <div className="flex flex-col space-y-4 bg-white p-8">
                <Section className="flex flex-col space-y-4 p-4">
                  <h3>Rabies Vaccination Certificate</h3>
                  <div className="flex space-x-4">
                    <CantFindFlow />
                    <PetWaiverFlow />
                  </div>
                </Section>
                <div className="flex justify-between">
                  <Button>Back</Button>
                  <Button className="bg-red-900 text-white" disabled>
                    Continue
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
