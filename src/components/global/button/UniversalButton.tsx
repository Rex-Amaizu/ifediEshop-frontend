// src/components/UniversalButton.tsx
"use client";

import React from "react";

interface UniversalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: string;
  width?: string;
  height?: string;
  rounded?: string;
  loading?: boolean;
  className?: string;
}

const UniversalButton: React.FC<UniversalButtonProps> = ({
  label = "Submit",
  color = "#fff",
  width = "100%",
  height = "45px",
  rounded = "8px",
  loading = false,
  disabled,
  className = "",
  style,
  ...rest
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`
        flex items-center justify-center 
        font-semibold duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${className}
      `}
      style={{
        color,
        width,
        height,
        borderRadius: rounded,
        ...style,
      }}
      {...rest}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default UniversalButton;
