/**
 * Semantic Heading Component
 * Uses theme tokens only - no hardcoded colors
 */

import React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export default function Heading({
  as,
  level = 1,
  children,
  className = "",
  ...props
}: HeadingProps) {
  const Tag = as || (`h${level}` as keyof JSX.IntrinsicElements);
  const sizeClasses = {
    1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold",
    2: "text-3xl sm:text-4xl md:text-5xl font-bold",
    3: "text-2xl sm:text-3xl md:text-4xl font-bold",
    4: "text-xl sm:text-2xl md:text-3xl font-semibold",
    5: "text-lg sm:text-xl md:text-2xl font-semibold",
    6: "text-base sm:text-lg md:text-xl font-semibold",
  };

  return (
    <Tag
      className={`${sizeClasses[level]} ${className}`}
      style={{
        color: "var(--text-heading)",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

