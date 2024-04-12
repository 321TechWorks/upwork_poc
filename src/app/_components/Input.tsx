"use client";

import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={twMerge("rounded-md border border-gray-200 p-4", className)}
      {...props}
    />
  );
}
