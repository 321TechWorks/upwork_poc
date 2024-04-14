"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { type LinkProps } from "next/link";

export type StepsProps = {
  steps: {
    id: string;
    title: React.ReactNode;
    icon?: React.ReactNode;
    link?: LinkProps["href"];
    content?: React.ReactNode;
    disabled?: boolean;
  }[];
};

type Props = StepsProps & {
  defaultValue?: string[];
};

export function Steps({ defaultValue, steps }: Props) {
  return (
    <Accordion.Root
      className="rounded-md"
      type="multiple"
      defaultValue={defaultValue}
    >
      {steps.map((step) => (
        <AccordionItem key={step.id} value={step.id} disabled={step.disabled}>
          <div className="flex items-center justify-between px-6">
            <div className="flex space-x-4">
              <div>{step.icon}</div>
              <div>{step.title}</div>
            </div>
            <AccordionTrigger />
          </div>
          <AccordionContent>{step.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
}

const AccordionItem = forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Item
      className="mt-1 rounded border border-gray-200 first:mt-0 focus-within:relative focus-within:z-10"
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      {...props}
      className="bg-transparent group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none outline-none"
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    {...props}
    className="h-fit text-[15px] data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

AccordionContent.displayName = "AccordionContent";
