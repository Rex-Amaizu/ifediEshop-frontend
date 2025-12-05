import React, {
  useId,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";

// UniversalInput.tsx
// A single-file, highly-configurable input/textarea component for Next.js + TypeScript
// - Works for text, email, password (with eye toggle), number, etc.
// - Can render <input> or <textarea>
// - Customizable outline, border, width, height, placeholder color
// - Optional outer label and error message
// - Accessible and forwards ref
// - Tailwind utility-first styling (you can pass additional classes via className)

// Usage examples at the bottom of the file.

type BaseProps = {
  label?: string; // outer label text. if omitted, no label shown
  variant?: "default" | "ghost" | "outline"; // prebuilt visual variants
  as?: "input" | "textarea"; // element type
  type?: string; // input type when as === 'input' (text, password, email...)
  placeholder?: string;
  placeholderColor?: string; // CSS color string, e.g. '#888' or 'rgba(0,0,0,0.4)'
  borderRadius?: string; // tailwind radius class or raw css, default 'rounded-md'
  borderWidth?: string; // tailwind border width class or raw css, default 'border'
  borderColor?: string; // css color string for border (uses CSS var + tailwind arbitrary)
  outlineColor?: string; // css color used when focused
  outlineWidth?: string; // e.g. '2px'
  width?: string; // css width (e.g. '100%', '16rem') or tailwind class like 'w-full'
  height?: string; // css height or tailwind class like 'h-12' (applies only to input)
  background?: string; // bg color
  showPasswordToggle?: boolean; // allow eye icon for password inputs
  outerClassName?: string; // for the wrapper
  inputClassName?: string; // additional classes for the control
  error?: string | boolean; // if string, show message; if true, adds error state
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
    placeholderColor = "#9CA3AF", // default: tailwind gray-400
    borderRadius = "rounded-md",
    borderWidth = "border",
    borderColor = "#D1D5DB", // tailwind gray-300
    outlineColor = "#60A5FA", // tailwind sky-400
    outlineWidth = "2px",
    width = "100%",
    height,
    background,
    showPasswordToggle = true,
    outerClassName = "",
    inputClassName = "",
    error = false,
    id,
    className,
    style,
    ...rest
  } = props as BaseProps;

  const autoId = useId();
  const inputId = (id as string) || `ui-${autoId}`;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const effectiveType =
    type === "password" && isPasswordVisible ? "text" : (type as string);

  // Build computed classes — Tailwind-first, with option to pass raw width/height via style
  // Use CSS variables for dynamic colors so we can use Tailwind arbitrary utilities with var().
  const cssVars: React.CSSProperties = {
    // custom property used by the `placeholder-[var(--ph)]` arbitrary class
    ["--ph" as any]: placeholderColor,
    ["--bc" as any]: borderColor,
    ["--oc" as any]: outlineColor,
    ...style,
  };

  // Inline style for raw width/height when user passes a freeform value
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

  // Classes for the control
  const baseControlClasses =
    `w-full placeholder-[var(--ph)] outline-none transition-shadow duration-150 ease-in-out ${borderRadius} ${borderWidth} ` +
    // use the CSS var border color with arbitrary value
    `border-[1px] border-[var(--bc)] focus:shadow-[0_0_0_calc(${outlineWidth})_var(--oc)]`;

  // Variant tweaks
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

  // Merge user input classes
  const mergedInputClasses =
    `${baseControlClasses} ${variantClasses} ${inputClassName} ${errorClasses}`.trim();

  // Accessible aria-invalid
  const ariaInvalid = !!error;

  // Render element (input or textarea)
  const Element = as === "textarea" ? "textarea" : "input";

  const inputStyle: React.CSSProperties = {
    background: background || undefined, // only apply if provided
    height,
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
          {...(rest as any)}
        />

        {/* Password toggle */}
        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setPasswordVisible((s) => !s)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded focus:outline-none"
          >
            {/* simple eye icons (no external dependency) */}
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

      {/* Error message */}
      {typeof error === "string" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Inline style explanation for the consumer (helpful) */}
      {/*
        Notes for usage:
        - Use `placeholderColor`, `borderColor`, and `outlineColor` to pass CSS color strings.
        - If you prefer Tailwind classes for width/height, pass them via `outerClassName` or `inputClassName`.
      */}
    </div>
  );
});

UniversalInput.displayName = "UniversalInput";

export default UniversalInput;

/*
  ===== Usage examples =====

  1) Basic text input with label and custom placeholder color:

  <UniversalInput
    label="Full name"
    name="fullName"
    placeholder="Enter your full name"
    placeholderColor="#9CA3AF"
    outerClassName="w-80"
  />

  2) Password input with toggle (eye icon)

  <UniversalInput
    label="Password"
    type="password"
    name="password"
    placeholder="••••••••"
    showPasswordToggle={true}
    outerClassName="w-80"
  />

  3) Textarea with custom border and outline

  <UniversalInput
    as="textarea"
    label="Bio"
    name="bio"
    rows={6}
    placeholder="Tell us about yourself"
    borderColor="#cbd5e1"
    outlineColor="#60a5fa"
    outerClassName="w-full max-w-2xl"
  />

  4) Controlled component example in a form

  const [email, setEmail] = useState("");
  <UniversalInput
    label="Email"
    type="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@example.com"
    placeholderColor="#6b7280"
    outerClassName="w-96"
  />

  5) Passing Tailwind width directly

  <UniversalInput
    label="Username"
    name="username"
    placeholder="pick a username"
    inputClassName="w-64"
  />

  Tips:
  - You can pass Tailwind classes for spacing/width via `outerClassName` or `inputClassName`.
  - For raw CSS widths/heights pass `width`/`height` as strings like '400px' or '16rem'.
  - The component forwards refs (useful for forms / focus control).
*/
