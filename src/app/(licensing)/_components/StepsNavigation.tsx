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
                "border-red-primary text-red-primary flex size-8 items-center justify-center rounded-full border",
                active === step.id ? "bg-red-primary text-white" : null,
                index > activeStepIndex
                  ? "text-gray-800 border-gray-200 bg-gray-200"
                  : null,
              )}
            >
              {index + 1}
            </div>
            <span className="text-gray-800 ml-1 text-sm">{step.title}</span>
            {!isLast && <hr className="hidden grow border-4 sm:block" />}
          </Link>
        );
      })}
    </div>
  );
}
