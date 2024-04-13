"use client";

import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  rows: { key: string; value: string | number }[];
};

export function KeyValueBlock({ className, rows }: Props) {
  return (
    <div className={twMerge("flex flex-col space-y-4", className)}>
      {rows.map((row, index) => (
        <div key={index} className="flex space-x-4">
          <span>{row.key}</span>
          <span className="text-gray-600">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
