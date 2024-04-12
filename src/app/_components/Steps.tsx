"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";

type Props = {
  defaultValue?: string[];
  steps: {
    id: string;
    icon: React.ReactNode;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
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
          <div className="flex items-center justify-between">
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
      className="mt-1 overflow-hidden rounded border border-gray-200 px-8 first:mt-0 focus-within:relative focus-within:z-10"
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
      className="group flex h-[45px] flex-1 cursor-default items-center justify-between bg-transparent px-5 text-[15px] leading-none outline-none"
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
    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden bg-transparent text-[15px]"
    ref={forwardedRef}
  >
    <div>{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = "AccordionContent";
