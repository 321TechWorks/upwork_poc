import { Checkbox } from "../_components/Checkbox";
import { Steps } from "../_components/Steps";

export default function AddPetPage() {
  return (
    <div className="px-56 py-8">
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
            content: "Add Pet",
          },
        ]}
      />
    </div>
  );
}
