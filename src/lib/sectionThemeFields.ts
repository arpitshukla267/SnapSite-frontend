/**
 * Granular theme field definitions for each section type
 * Defines what color fields are available for each section component
 */

export type ThemeFieldType = 
  | "background" 
  | "header" 
  | "subheader" 
  | "paragraph" 
  | "button" 
  | "button2"
  | "accent"
  | "border"
  | "icon";

export type BackgroundType = "solid" | "gradient";

export interface ThemeField {
  type: ThemeFieldType;
  label: string;
  supportsGradient?: boolean;
  defaultColor: string;
  defaultGradient?: string[]; // For gradient backgrounds
}

export interface CardThemeFields {
  header: string;
  subheader: string;
  paragraph: string;
  background?: string;
  border?: string;
  icon?: string;
  button?: {
    background: string;
    text: string;
  };
}

export interface GranularSectionTheme {
  background: {
    type: BackgroundType;
    solid?: string;
    gradient?: string[]; // Array of colors for gradient
  };
  header?: string;
  subheader?: string;
  paragraph?: string;
  button?: {
    background: string;
    text: string;
    border?: string;
  };
  button2?: {
    background: string;
    text: string;
    border?: string;
  };
  accent?: string;
  border?: string;
  icon?: string;
  cards?: CardThemeFields[]; // For sections with card arrays
}

/**
 * Field definitions for each section type
 */
export const sectionThemeFields: Record<string, ThemeField[]> = {
  // Hero Sections
  heroMinimal: [
    { type: "background", label: "Background", supportsGradient: true, defaultColor: "#ffffff", defaultGradient: ["#f9fafb", "#ffffff"] },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "Button", defaultColor: "#1f2937" },
    { type: "accent", label: "Accent Line", defaultColor: "#4f46e5" },
  ],
  heroGradient: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#4f46e5", defaultGradient: ["#4f46e5", "#ec4899", "#f59e0b"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#ffffff" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
  ],
  heroSplit: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
    { type: "accent", label: "Accent Line", defaultColor: "#4f46e5" },
  ],
  heroVideo: [
    { type: "background", label: "Background", defaultColor: "#000000" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#ffffff" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
  ],
  heroCentered: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
    { type: "button2", label: "Button 2", defaultColor: "#64748b" },
  ],
  heroAdvanced: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#0f172a", defaultGradient: ["#4f46e5", "#ec4899", "#22c55e"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#ffffff" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
    { type: "button2", label: "Button 2", defaultColor: "#ffffff" },
  ],
  heroAnimated: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#0f172a", defaultGradient: ["#4f46e5", "#ec4899", "#f59e0b"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#e2e8f0" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
    { type: "button2", label: "Button 2", defaultColor: "transparent" },
  ],
  heroModern: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#ffffff", defaultGradient: ["#f9fafb", "#ffffff"] },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
    { type: "button2", label: "Button 2", defaultColor: "#f1f5f9" },
  ],

  // About Sections
  aboutSimple: [
    { type: "background", label: "Background", defaultColor: "#f9fafb" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "paragraph", label: "Description", defaultColor: "#64748b" },
  ],
  aboutCentered: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "paragraph", label: "Description", defaultColor: "#64748b" },
  ],
  aboutImageLeft: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "paragraph", label: "Description", defaultColor: "#64748b" },
  ],
  aboutAdvanced: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "paragraph", label: "Description", defaultColor: "#64748b" },
    { type: "accent", label: "Accent Line", defaultColor: "#4f46e5" },
  ],
  aboutModern: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "paragraph", label: "Description", defaultColor: "#64748b" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
  ],
  aboutShowcase: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "paragraph", label: "Description", defaultColor: "#94a3b8" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
  ],

  // Features Sections
  featuresGrid: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "accent", label: "Card Accent", defaultColor: "#3b82f6" },
    // Cards will be handled dynamically
  ],
  featuresIcons: [
    { type: "background", label: "Background", defaultColor: "#f9fafb" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "icon", label: "Icon", defaultColor: "#4f46e5" },
  ],
  featuresAdvanced: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "icon", label: "Icon", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  featuresModern: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  featuresShowcase: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  featuresPremium: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],

  // CTA Sections
  ctaSimple: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#4f46e5", defaultGradient: ["#4f46e5", "#ec4899", "#f59e0b"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#ffffff" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
  ],
  ctaSplit: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
  ],
  ctaBoxed: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#4f46e5", defaultGradient: ["#4f46e5", "#ec4899"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#ffffff" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
  ],
  ctaAnimated: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#4f46e5", defaultGradient: ["#4f46e5", "#ec4899", "#f59e0b"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#e2e8f0" },
    { type: "button", label: "Button", defaultColor: "#ffffff" },
  ],
  ctaGlass: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
  ],

  // Testimonials Sections
  testimonialCards: [
    { type: "background", label: "Background", defaultColor: "#f9fafb" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  testimonialsAdvanced: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "icon", label: "Quote Icon", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  testimonialsModern: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  testimonialsShowcase: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],

  // Pricing Sections
  pricingThreeColumn: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  pricingModern: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  pricingPremium: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],

  // Contact Sections
  contactForm: [
    { type: "background", label: "Background", defaultColor: "#f9fafb" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "icon", label: "Icon", defaultColor: "#4f46e5" },
    { type: "button", label: "Submit Button", defaultColor: "#4f46e5" },
  ],
  contactModern: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    { type: "button", label: "Submit Button", defaultColor: "#4f46e5" },
  ],
  contactInteractive: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    { type: "button", label: "Button", defaultColor: "#4f46e5" },
  ],

  // Footer Sections
  footerSimple: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "paragraph", label: "Text", defaultColor: "#94a3b8" },
  ],
  footerModern: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "paragraph", label: "Text", defaultColor: "#94a3b8" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
  ],
  footerGradient: [
    { type: "background", label: "Background Gradient", supportsGradient: true, defaultColor: "#0f172a", defaultGradient: ["#4f46e5", "#7c3aed", "#ec4899"] },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "paragraph", label: "Text", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
  ],

  // Team Sections
  teamGrid: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  teamModern: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  teamShowcase: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    { type: "accent", label: "Accent", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],

  // Portfolio Sections
  portfolioGrid: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  portfolioAdvanced: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    { type: "button", label: "View Button", defaultColor: "#4f46e5" },
    // Cards will be handled dynamically
  ],
  portfolioShowcase: [
    { type: "background", label: "Background", defaultColor: "#ffffff" },
    { type: "header", label: "Title", defaultColor: "#0f172a" },
    { type: "subheader", label: "Subtitle", defaultColor: "#64748b" },
    // Cards will be handled dynamically
  ],
  portfolioMasonry: [
    { type: "background", label: "Background", defaultColor: "#0f172a" },
    { type: "header", label: "Title", defaultColor: "#ffffff" },
    { type: "subheader", label: "Subtitle", defaultColor: "#cbd5e1" },
    // Cards will be handled dynamically
  ],
};

/**
 * Get default granular theme for a section type
 */
export function getDefaultGranularTheme(sectionType: string, sectionProps?: any): GranularSectionTheme {
  const fields = sectionThemeFields[sectionType] || [];
  const theme: GranularSectionTheme = {
    background: {
      type: "solid",
      solid: "#ffffff",
    },
  };

  fields.forEach(field => {
    switch (field.type) {
      case "background":
        if (field.supportsGradient && field.defaultGradient) {
          theme.background = {
            type: "gradient",
            gradient: [...field.defaultGradient],
          };
        } else {
          theme.background = {
            type: "solid",
            solid: field.defaultColor,
          };
        }
        break;
      case "header":
        theme.header = field.defaultColor;
        break;
      case "subheader":
        theme.subheader = field.defaultColor;
        break;
      case "paragraph":
        theme.paragraph = field.defaultColor;
        break;
      case "button":
        theme.button = {
          background: field.defaultColor,
          text: "#ffffff",
        };
        break;
      case "button2":
        theme.button2 = {
          background: "transparent",
          text: field.defaultColor,
          border: field.defaultColor,
        };
        break;
      case "accent":
        theme.accent = field.defaultColor;
        break;
      case "icon":
        theme.icon = field.defaultColor;
        break;
    }
  });

  // Handle cards if section has items/features/testimonials/etc
  if (sectionProps) {
    const cardArrays = ["items", "features", "testimonials", "projects", "plans", "members"];
    for (const arrayName of cardArrays) {
      if (sectionProps[arrayName] && Array.isArray(sectionProps[arrayName]) && sectionProps[arrayName].length > 0) {
        // Check if section type is pricing (has buttons in cards)
        const hasCardButtons = sectionType === "pricingThreeColumn";
        theme.cards = sectionProps[arrayName].map(() => ({
          header: "#0f172a",
          subheader: "#64748b",
          paragraph: "#64748b",
          background: "#ffffff",
          ...(hasCardButtons && {
            button: {
              background: "#4f46e5",
              text: "#ffffff",
            }
          })
        }));
        break; // Only handle first array found
      }
    }
  }

  return theme;
}

/**
 * Get theme fields for a section type
 */
export function getSectionThemeFields(sectionType: string): ThemeField[] {
  return sectionThemeFields[sectionType] || [];
}

