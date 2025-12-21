/**
 * Convert granular theme to component props
 * Maps theme colors to Tailwind-compatible props
 */

import { GranularSectionTheme } from "./sectionThemeFields";

export interface SectionColorProps {
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  paragraphColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
  button2Background?: string;
  button2TextColor?: string;
  accentColor?: string;
  iconColor?: string;
  // For gradients - array of colors
  gradientColors?: string[];
  cardColors?: CardColorProps[];
}

export interface CardColorProps {
  headerColor?: string;
  subheaderColor?: string;
  paragraphColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  iconColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
}

/**
 * Convert granular theme to color props for components
 */
export function themeToProps(theme: GranularSectionTheme | null | undefined): SectionColorProps {
  if (!theme) {
    return {};
  }

  const props: SectionColorProps = {};

  // Background
  if (theme.background) {
    if (theme.background.type === "gradient" && theme.background.gradient) {
      props.gradientColors = [...theme.background.gradient];
      // Use first color as fallback background
      props.backgroundColor = theme.background.gradient[0];
    } else {
      props.backgroundColor = theme.background.solid || "#ffffff";
    }
  }

  // Header/Title
  if (theme.header) {
    props.titleColor = theme.header;
  }

  // Subheader
  if (theme.subheader) {
    props.subtitleColor = theme.subheader;
  }

  // Paragraph/Description
  if (theme.paragraph) {
    props.descriptionColor = theme.paragraph;
    props.paragraphColor = theme.paragraph;
  }

  // Button
  if (theme.button) {
    props.buttonBackground = theme.button.background;
    props.buttonTextColor = theme.button.text;
  }

  // Button 2
  if (theme.button2) {
    props.button2Background = theme.button2.background;
    props.button2TextColor = theme.button2.text;
  }

  // Accent
  if (theme.accent) {
    props.accentColor = theme.accent;
  }

  // Icon
  if (theme.icon) {
    props.iconColor = theme.icon;
  }

  // Cards - array indexed by card index
  if (theme.cards && Array.isArray(theme.cards)) {
    props.cardColors = theme.cards.map((card: any) => ({
      headerColor: card.header,
      subheaderColor: card.subheader,
      paragraphColor: card.paragraph,
      backgroundColor: card.background,
      borderColor: card.border,
      iconColor: card.icon,
      buttonBackground: card.button?.background,
      buttonTextColor: card.button?.text,
    }));
  }

  return props;
}

