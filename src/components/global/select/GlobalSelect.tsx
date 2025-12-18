import React, {
  forwardRef,
  SelectHTMLAttributes,
  useId,
  useState,
} from "react";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  options: readonly Option[];
  placeholder?: string;
  borderColor?: string; // CSS color
  outlineColor?: string; // focus outline color
  width?: string; // tailwind or raw CSS width
  background?: string;
  borderRadius?: string; // tailwind radius
  outerClassName?: string;
  selectClassName?: string;
  error?: string | boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

const GlobalSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      options,
      placeholder = "Select an option",
      width = "100%",
      borderColor = "#D1D5DB",
      outlineColor = "#60A5FA",
      borderRadius = "rounded-md",
      background,
      outerClassName = "",
      selectClassName = "",
      error = false,
      id,
      style,
      ...rest
    } = props;

    const autoId = useId();
    const selectId = id || `gs-${autoId}`;

    const cssVars: React.CSSProperties = {
      ["--bc" as any]: borderColor,
      ["--oc" as any]: outlineColor,
      ...style,
    };

    const errorClasses =
      typeof error === "string" || error === true
        ? "border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.2)]"
        : "";

    const mergedClasses = `
        w-full appearance-none bg-white px-3 py-2
        border border-[var(--bc)]
        ${borderRadius}
        outline-none
        text-sm
        focus:shadow-[0_0_0_2px_var(--oc)]
        transition-all
        ${selectClassName}
        ${errorClasses}
      `.trim();

    return (
      <div className={`flex flex-col gap-2 ${outerClassName}`} style={cssVars}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <div className="relative" style={{ width }}>
          <select
            style={{ background, ...style }}
            id={selectId}
            ref={ref}
            className={mergedClasses}
            aria-invalid={!!error}
            {...rest}
          >
            {/* Fake placeholder */}
            {!rest.multiple && placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {typeof error === "string" && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

GlobalSelect.displayName = "GlobalSelect";

export default GlobalSelect;
