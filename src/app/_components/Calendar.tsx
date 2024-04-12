"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { twMerge } from "tailwind-merge";

import { Input } from "./Input";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  className?: string;
};

function Calendar({ className }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      selected={startDate}
      wrapperClassName={twMerge(
        "bg-gray-100 text-black rounded-md px-8 py-4",
        className,
      )}
      customInput={<Input className="w-full" />}
      onChange={(date) => {
        setStartDate(date);
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
