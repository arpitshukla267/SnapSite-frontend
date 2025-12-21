/**
 * Semantic Card Component
 * Uses theme tokens only - no hardcoded colors
 * Supports array index for card-specific overrides
 */

import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Text from "./Text";
import Button from "./Button";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number; // Array index for scoped CSS variables
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonVariant?: "primary" | "secondary";
  onButtonClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  index,
  title,
  subtitle,
  description,
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
  children,
  className = "",
  ...props
}: CardProps) {
  // Use scoped CSS variables if index is provided
  const cardStyle: React.CSSProperties = {
    backgroundColor: index !== undefined 
      ? `var(--card-${index}-bg, var(--surface))`
      : "var(--surface)",
    borderColor: index !== undefined
      ? `var(--card-${index}-border, var(--border))`
      : "var(--border)",
    ...props.style,
  };

  return (
    <div
      className={`p-6 rounded-lg border ${className}`}
      style={cardStyle}
      {...props}
    >
      {title && (
        <Heading level={3} className="mb-2">
          {title}
        </Heading>
      )}
      {subtitle && (
        <SubHeading className="mb-3">
          {subtitle}
        </SubHeading>
      )}
      {description && (
        <Text className="mb-4">
          {description}
        </Text>
      )}
      {children}
      {buttonText && (
        <Button variant={buttonVariant} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

