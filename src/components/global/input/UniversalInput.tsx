import React, {
  useId,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";

type BaseProps = {
  label?: string;
  variant?: "default" | "ghost" | "outline";
  as?: "input" | "textarea";
  type?: string;
  placeholder?: string;
  placeholderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  outlineColor?: string;
  outlineWidth?: string;
  width?: string;
  height?: string;
  background?: string;
  showPasswordToggle?: boolean;
  outerClassName?: string;
  inputClassName?: string;
  error?: string | boolean;
  min?: number | string; // ✅ added min for number inputs
} & Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder">;

const UniversalInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  BaseProps
>((props, ref) => {
  const {
    label,
    variant = "default",
    as = "input",
    type = "text",
    placeholder = "",
    placeholderColor = "#9CA3AF",
    borderRadius = "rounded-md",
    borderWidth = "border",
    borderColor = "#D1D5DB",
    outlineColor = "#60A5FA",
    outlineWidth = "2px",
    width = "100%",
    height,
    background,
    showPasswordToggle = true,
    outerClassName = "",
    inputClassName = "",
    error = false,
    min,
    id,
    style,
    ...rest
  } = props as BaseProps;

  const autoId = useId();
  const inputId = (id as string) || `ui-${autoId}`;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const effectiveType =
    type === "password" && isPasswordVisible ? "text" : (type as string);

  const cssVars: React.CSSProperties = {
    ["--ph" as any]: placeholderColor,
    ["--bc" as any]: borderColor,
    ["--oc" as any]: outlineColor,
    ...style,
  };

  const dimensionStyle: React.CSSProperties = {};
  if (
    width &&
    (width.includes("%") || width.includes("px") || width.includes("rem"))
  ) {
    dimensionStyle.width = width;
  }
  if (
    height &&
    (height.includes("%") || height.includes("px") || height.includes("rem"))
  ) {
    dimensionStyle.height = height;
  }

  const baseControlClasses =
    `w-full placeholder-[var(--ph)] outline-none transition-shadow duration-150 ease-in-out ${borderRadius} ${borderWidth} ` +
    `border-[1px] border-[var(--bc)] focus:shadow-[0_0_0_calc(${outlineWidth})_var(--oc)]`;

  const variantClasses = (() => {
    switch (variant) {
      case "ghost":
        return "bg-transparent border-transparent focus:border-[var(--bc)]";
      case "outline":
        return "bg-white";
      default:
        return "bg-white";
    }
  })();

  const errorClasses =
    typeof error === "string" || error === true
      ? "border-red-500 focus:shadow-[0_0_0_calc(var(--outline-width,2px))_rgba(239,68,68,0.2)]"
      : "";

  const mergedInputClasses =
    `${baseControlClasses} ${variantClasses} ${inputClassName} ${errorClasses}`.trim();

  const ariaInvalid = !!error;

  const Element = as === "textarea" ? "textarea" : "input";

  const inputStyle: React.CSSProperties = {
    background: background || undefined,
    height,
  };

  const { onChange: originalOnChange, ...inputProps } = rest as any;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    originalOnChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && e.key === "-" && min !== undefined) {
      e.preventDefault();
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${outerClassName}`} style={cssVars}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}

      <div className="relative" style={dimensionStyle}>
        <Element
          id={inputId}
          ref={ref as any}
          className={mergedInputClasses}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          type={as === "textarea" ? undefined : effectiveType}
          rows={as === "textarea" ? (rest as any).rows || 4 : undefined}
          style={inputStyle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          min={type === "number" ? min : undefined} // ✅ enforce min for number inputs
          {...inputProps}
        />

        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setPasswordVisible((s) => !s)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded focus:outline-none"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.14-3.05 3.41-5.5 6.19-6.85" />
                <path d="M1 1l22 22" />
                <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {typeof error === "string" && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

UniversalInput.displayName = "UniversalInput";

export default UniversalInput;
