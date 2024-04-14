"use client";

import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  entries: ({ key: string; value: string | number } | null)[];
};

export function StepSummary({ className, entries }: Props) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 gap-4 sm:ml-[20px] sm:grid-cols-2",
        className,
      )}
    >
      {entries.filter(isNotNull).map((entry, index) => (
        <div key={index} className="flex space-x-2">
          <span>{entry.key}</span>
          <div>|</div>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function isNotNull<Something>(s: Something | null): s is Something {
  return s !== null;
}
