import { Button } from "../_components/Button";
import { Calendar } from "../_components/Calendar";
import { Checkbox } from "../_components/Checkbox";
import { Input } from "../_components/Input";
import { Select } from "../_components/Select";
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
            content: (
              <div className="flex flex-col space-y-4  bg-white p-8">
                <Calendar />
                <Button>Some button default</Button>
                <Button className="bg-red-900 text-white">
                  Some button red
                </Button>
                <Input placeholder="Some input" />
                <Select />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
