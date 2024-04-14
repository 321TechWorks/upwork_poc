"use client";

import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function InputError({ className, children }: Props) {
  return (
    <span className={twMerge("text-red-primary px-2 text-xs", className)}>
      {children}
    </span>
  );
}
