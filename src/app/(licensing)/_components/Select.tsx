"use client";

import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<{
  className?: string;
  placeholder?: string;
  options: { value: string | number; description?: string }[];
  value: string | number;
  onChange: (value: string) => void;
}>;

export const Select = ({
  className,
  placeholder,
  options,
  value,
  onChange,
}: Props) => (
  <RadixSelect.Root value={String(value)} onValueChange={onChange}>
    <RadixSelect.Trigger
      className={twMerge(
        "placeholder-gray-500 inline-flex items-center justify-between truncate rounded-md border border-gray-200 p-4",
        className,
      )}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon>
        <ChevronDownIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal>
      <RadixSelect.Content className="z-50 overflow-hidden rounded-md bg-white">
        <RadixSelect.Viewport className="p-[5px]">
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.description ?? option.value}
            </SelectItem>
          ))}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={twMerge(
          "text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";
