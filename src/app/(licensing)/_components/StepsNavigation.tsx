"use client";

import { twMerge } from "tailwind-merge";

import { type StepsProps } from "./Steps";
import Link from "next/link";

type Props = StepsProps & {
  active: string;
};

export function StepsNavigation({ active, steps }: Props) {
  const activeStepIndex = steps.findIndex((step) => active === step.id);

  return (
    <div className="flex justify-between px-2 sm:px-[90px]">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <Link
            key={step.id}
            className={twMerge("flex items-center", !isLast ? "grow" : null)}
            href={step.link ?? {}}
          >
            <div
              className={twMerge(
                "flex size-8 items-center justify-center rounded-full border border-red-primary text-red-primary",
                active === step.id ? "bg-red-primary text-white" : null,
                index > activeStepIndex
                  ? "border-gray-200 bg-gray-200 text-gray-800"
                  : null,
              )}
            >
              {index + 1}
            </div>
            <span className="ml-1 text-sm text-gray-800">{step.title}</span>
            {!isLast && <hr className="hidden grow border-4 sm:block" />}
          </Link>
        );
      })}
    </div>
  );
}
