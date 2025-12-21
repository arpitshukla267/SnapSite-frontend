/**
 * Semantic SubHeading Component
 * Uses theme tokens only - no hardcoded colors
 */

import React from "react";

export interface SubHeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

export default function SubHeading({
  as = "p",
  children,
  className = "",
  ...props
}: SubHeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={`text-lg sm:text-xl md:text-2xl ${className}`}
      style={{
        color: "var(--text-subheading)",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

