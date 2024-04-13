"use client";

import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function Section({ className, children }: Props) {
  return (
    <div className={twMerge("rounded border border-gray-200", className)}>
      {children}
    </div>
  );
}
