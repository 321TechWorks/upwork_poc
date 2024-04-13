"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<
  HTMLInputElement,
  {
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
  }
>(({ className, onChange, ...props }, forwardedRef) => {
  return (
    <input
      ref={forwardedRef}
      type="text"
      className={twMerge(
        "rounded-md border border-gray-200 p-4 placeholder-gray-200",
        className,
      )}
      onChange={(evt) => {
        onChange?.(evt.target.value);
      }}
      {...props}
    />
  );
});

Input.displayName = "Input";
