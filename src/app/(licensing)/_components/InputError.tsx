"use client";

import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function InputError({ className, children }: Props) {
  return (
    <span className={twMerge("px-2 text-xs text-red-900", className)}>
      {children}
    </span>
  );
}
