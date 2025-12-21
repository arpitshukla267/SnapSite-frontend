/**
 * Legacy theme system - kept for backward compatibility
 * New granular theme system is in sectionThemeFields.ts
 */

export interface SectionTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  borderRadius: string;
}

export const defaultSectionThemes: Record<string, SectionTheme> = {
  heroMinimal: {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    accent: "#60a5fa",
    background: "#ffffff",
    text: "#0f172a",
    borderRadius: "0.5rem",
  },
  // ... other defaults remain the same
};

export function getDefaultSectionTheme(sectionType: string): SectionTheme {
  return defaultSectionThemes[sectionType] || {
    primary: "#4f46e5",
    secondary: "#ec4899",
    accent: "#60a5fa",
    background: "#ffffff",
    text: "#0f172a",
    borderRadius: "0.5rem",
  };
}

/**
 * Apply granular theme as scoped CSS variables
 */
export function applyGranularTheme(element: HTMLElement, theme: any) {
  // Background
  if (theme.background) {
    if (theme.background.type === "gradient" && theme.background.gradient) {
      const gradient = theme.background.gradient.join(", ");
      element.style.setProperty("--section-background", `linear-gradient(135deg, ${gradient})`);
    } else {
      element.style.setProperty("--section-background", theme.background.solid || "#ffffff");
    }
  }

  // Header
  if (theme.header) {
    element.style.setProperty("--section-header", theme.header);
  }

  // Subheader
  if (theme.subheader) {
    element.style.setProperty("--section-subheader", theme.subheader);
  }

  // Paragraph
  if (theme.paragraph) {
    element.style.setProperty("--section-paragraph", theme.paragraph);
  }

  // Button
  if (theme.button) {
    element.style.setProperty("--section-button-bg", theme.button.background || "#4f46e5");
    element.style.setProperty("--section-button-text", theme.button.text || "#ffffff");
    if (theme.button.border) {
      element.style.setProperty("--section-button-border", theme.button.border);
    }
  }

  // Button 2
  if (theme.button2) {
    element.style.setProperty("--section-button2-bg", theme.button2.background || "transparent");
    element.style.setProperty("--section-button2-text", theme.button2.text || "#ffffff");
    if (theme.button2.border) {
      element.style.setProperty("--section-button2-border", theme.button2.border);
    }
  }

  // Accent
  if (theme.accent) {
    element.style.setProperty("--section-accent", theme.accent);
  }

  // Icon
  if (theme.icon) {
    element.style.setProperty("--section-icon", theme.icon);
  }

  // Cards (applied via data attributes or CSS variables)
  if (theme.cards && Array.isArray(theme.cards)) {
    theme.cards.forEach((card: any, index: number) => {
      element.style.setProperty(`--section-card-${index}-header`, card.header || "#0f172a");
      element.style.setProperty(`--section-card-${index}-subheader`, card.subheader || "#64748b");
      element.style.setProperty(`--section-card-${index}-paragraph`, card.paragraph || "#64748b");
      if (card.background) {
        element.style.setProperty(`--section-card-${index}-background`, card.background);
      }
    });
  }
}

/**
 * Legacy function - kept for backward compatibility
 */
export function applySectionTheme(element: HTMLElement, theme: SectionTheme) {
  element.style.setProperty("--section-primary", theme.primary);
  element.style.setProperty("--section-secondary", theme.secondary);
  element.style.setProperty("--section-accent", theme.accent);
  element.style.setProperty("--section-background", theme.background);
  element.style.setProperty("--section-text", theme.text);
  element.style.setProperty("--section-border-radius", theme.borderRadius);
}
