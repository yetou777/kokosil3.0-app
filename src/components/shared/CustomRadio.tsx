"use client";

import { ChangeEvent, ReactNode } from "react";

type CustomRadioProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};

export default function CustomRadio({
  name,
  value,
  checked,
  onChange,
  children,
}: CustomRadioProps) {
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {/* The custom radio button */}
      <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
        {/* The inner dot */}
        <div className={`h-3 w-3 rounded-full bg-primary transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}></div>
      </div>
      <span className="ml-3 text-gray-700">{children}</span>
    </label>
  );
}
