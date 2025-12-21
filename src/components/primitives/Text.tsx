/**
 * Semantic Text Component
 * Uses theme tokens only - no hardcoded colors
 */

import React from "react";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  variant?: "body" | "muted";
  children: React.ReactNode;
  className?: string;
}

export default function Text({
  as = "p",
  variant = "body",
  children,
  className = "",
  ...props
}: TextProps) {
  const Tag = as;
  const colorVar = variant === "muted" ? "var(--text-muted)" : "var(--text-body)";

  return (
    <Tag
      className={`text-base leading-relaxed ${className}`}
      style={{
        color: colorVar,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

