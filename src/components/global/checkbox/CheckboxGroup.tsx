"use client";
import React from "react";

export type CheckboxOption<T extends string = string> = {
  label: string;
  value: T;
};

interface Props<T extends string = string> {
  label: string;
  options: readonly CheckboxOption<T>[];
  value: T[];
  onChange: (values: T[]) => void;
  error?: string;
  renderItem?: (opt: CheckboxOption<T>, checked: boolean) => React.ReactNode;
}

const CheckboxGroup = ({
  label,
  options,
  value,
  onChange,
  error,
  renderItem,
}: Props) => {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-700">{label}</label>

      <div className="grid grid-cols-4 gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt.value);

          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-xs cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt.value)}
                className="accent-black"
              />

              {renderItem ? renderItem(opt, checked) : <span>{opt.label}</span>}
            </label>
          );
        })}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
