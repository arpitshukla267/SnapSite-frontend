/**
 * Semantic Button Component
 * Uses theme tokens only - no hardcoded colors
 */

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95 ${className}`}
      style={{
        backgroundColor: isPrimary ? "var(--action-primary)" : "var(--action-secondary)",
        color: isPrimary ? "var(--action-primary-text)" : "var(--action-secondary-text)",
        border: `1px solid ${isPrimary ? "var(--action-primary)" : "var(--action-secondary)"}`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

