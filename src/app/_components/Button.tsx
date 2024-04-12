"use client";

import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export function Button({ className, children }: Props) {
  return (
    <button
      className={twMerge(
        "bg-gray-100 text-black rounded-md px-8 py-4",
        className,
      )}
    >
      {children}
    </button>
  );
}
