"use client";

import { twMerge } from "tailwind-merge";

type Props = React.PropsWithChildren<
  {
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "bg-transparent border-gray-400 rounded-md border px-4 py-2 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
