"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export function Checkbox(props: RadixCheckbox.CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className="data-[state=checked]:text-red data-[state=checked]:border-red flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full border bg-transparent outline-none data-[state=checked]:border-2"
      {...props}
    >
      <RadixCheckbox.Indicator>
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
