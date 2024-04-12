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
        "text-black rounded-md bg-gray-100 px-8 py-4 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
