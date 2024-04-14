"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export function Checkbox(props: RadixCheckbox.CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className="bg-transparent border-gray-400 data-[state=checked]:border-red-primary data-[state=checked]:text-red-primary flex size-6 appearance-none items-center justify-center rounded-full border border-2 data-[state=checked]:size-8"
      {...props}
    >
      <RadixCheckbox.Indicator>
        <CheckIcon className="size-8" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
