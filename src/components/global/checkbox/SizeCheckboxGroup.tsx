"use client";
import React from "react";
import { sizeOptionsMap, SizeTypeKey } from "@/utils/selectData";

type SizeOption = {
  label: string;
  value: string | number;
};

interface Props {
  sizeType: SizeTypeKey;
  value: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  error?: string;
}

const SizeCheckboxGroup = ({ sizeType, value, onChange, error }: Props) => {
  const options: SizeOption[] = sizeOptionsMap[sizeType] || [];

  const toggle = (val: string | number) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-700">Sizes</label>

      <div className="grid grid-cols-5 gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt.value);

          return (
            <label
              key={opt.value}
              className={`flex items-center justify-center border rounded-md h-9 text-sm cursor-pointer
                ${checked ? "bg-black text-white" : "bg-white text-black"}
              `}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default SizeCheckboxGroup;
