"use client";

import DatePicker from "react-datepicker";
import { twMerge } from "tailwind-merge";

import { Input } from "./Input";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  className?: string;
  value?: Date;
  onChange: () => void;
};

function Calendar({ className, value, onChange }: Props) {
  return (
    <DatePicker
      selected={value}
      wrapperClassName={twMerge(
        "bg-gray-100 text-black rounded-md px-8 py-4",
        className,
      )}
      customInput={<Input className="w-full" />}
      onChange={onChange}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
