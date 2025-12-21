/**
 * Semantic Design Tokens - Single Source of Truth
 * All colors are defined by content role, not component
 */

export interface ThemeTokens {
  colors: {
    background: string;
    surface: string;
    text: {
      heading: string;
      subheading: string;
      body: string;
      muted: string;
    };
    action: {
      primary: string;
      primaryText: string;
      secondary: string;
      secondaryText: string;
    };
    border: string;
  };
}

/**
 * Default theme tokens
 */
export const defaultThemeTokens: ThemeTokens = {
  colors: {
    background: "#ffffff",
    surface: "#f9fafb",
    text: {
      heading: "#0f172a",
      subheading: "#475569",
      body: "#64748b",
      muted: "#94a3b8",
    },
    action: {
      primary: "#4f46e5",
      primaryText: "#ffffff",
      secondary: "#e2e8f0",
      secondaryText: "#0f172a",
    },
    border: "#e2e8f0",
  },
};

/**
 * Dark theme tokens
 */
export const darkThemeTokens: ThemeTokens = {
  colors: {
    background: "#0f172a",
    surface: "#1e293b",
    text: {
      heading: "#ffffff",
      subheading: "#cbd5e1",
      body: "#94a3b8",
      muted: "#64748b",
    },
    action: {
      primary: "#6366f1",
      primaryText: "#ffffff",
      secondary: "#334155",
      secondaryText: "#ffffff",
    },
    border: "#334155",
  },
};

/**
 * Map theme tokens to CSS variable names
 */
export function mapTokensToCSSVariables(tokens: ThemeTokens): Record<string, string> {
  return {
    "--bg": tokens.colors.background,
    "--surface": tokens.colors.surface,
    "--text-heading": tokens.colors.text.heading,
    "--text-subheading": tokens.colors.text.subheading,
    "--text-body": tokens.colors.text.body,
    "--text-muted": tokens.colors.text.muted,
    "--action-primary": tokens.colors.action.primary,
    "--action-primary-text": tokens.colors.action.primaryText,
    "--action-secondary": tokens.colors.action.secondary,
    "--action-secondary-text": tokens.colors.action.secondaryText,
    "--border": tokens.colors.border,
  };
}

/**
 * Get CSS variable name for a token path
 */
export function getCSSVariableName(path: string): string {
  const mapping: Record<string, string> = {
    "colors.background": "--bg",
    "colors.surface": "--surface",
    "colors.text.heading": "--text-heading",
    "colors.text.subheading": "--text-subheading",
    "colors.text.body": "--text-body",
    "colors.text.muted": "--text-muted",
    "colors.action.primary": "--action-primary",
    "colors.action.primaryText": "--action-primary-text",
    "colors.action.secondary": "--action-secondary",
    "colors.action.secondaryText": "--action-secondary-text",
    "colors.border": "--border",
  };
  return mapping[path] || path;
}

