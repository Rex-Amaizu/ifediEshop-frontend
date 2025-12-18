"use client";
import CheckboxGroup from "@/components/global/checkbox/CheckboxGroup";
import { colorsSelect } from "@/utils/selectData";

interface Props {
  value: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

const ColorCheckboxGroup = ({ value, onChange, error }: Props) => {
  return (
    <CheckboxGroup
      label="Colors"
      options={colorsSelect}
      value={value}
      onChange={onChange}
      error={error}
      renderItem={(opt) => (
        <>
          <span
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: opt.value }}
          />
          {opt.label}
        </>
      )}
    />
  );
};

export default ColorCheckboxGroup;
