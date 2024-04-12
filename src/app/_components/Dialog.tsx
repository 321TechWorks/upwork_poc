"use client";

import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Cross2Icon } from "@radix-ui/react-icons";

type Props = React.PropsWithChildren<{
  title: React.ReactNode;
  content: (
    renderClose: (node: React.ReactNode) => React.ReactNode,
  ) => React.ReactNode;
}>;

export const Dialog = ({ children, title, content }: Props) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <RadixDialog.Title className="text-mauve12 m-0 mb-4 text-[17px] font-medium">
          <h3 className="font-black">{title}</h3>
        </RadixDialog.Title>
        <ScrollArea.Root className="h-96">
          <ScrollArea.Viewport className="h-full w-full">
            {content((node) => (
              <RadixDialog.Close asChild>{node}</RadixDialog.Close>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="bg-blackA3 hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="bg-blackA3 hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-blackA5" />
        </ScrollArea.Root>
        <RadixDialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
