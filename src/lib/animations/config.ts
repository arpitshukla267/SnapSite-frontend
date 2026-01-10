/**
 * Animation Configuration System
 * 
 * Single source of truth for all background animations.
 * This config is serializable and works in both builder and export.
 */

export type AnimationType = 
  | "animated-gradient" 
  | "waves" 
  | "particles" 
  | "grid" 
  | "orbs" 
  | "mesh"
  | "none";

export type AnimationDirection = "horizontal" | "vertical" | "diagonal" | "radial";
export type AnimationEasing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

export interface AnimationConfig {
  speed: number; // 0.5 = slow, 1.0 = normal, 2.0 = fast
  direction: AnimationDirection;
  easing: AnimationEasing;
  loop: boolean;
}

export interface GradientConfig {
  colors: string[]; // Array of color values
  angle?: number; // 0-360 degrees
  stops?: number[]; // Optional color stop positions (0-1)
}

export interface WaveConfig {
  enabled: boolean;
  amplitude: number; // Wave height
  frequency: number; // Wave speed (0-1)
  color?: string;
  opacity?: number;
}

export interface ParticleConfig {
  enabled: boolean;
  count: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  opacity: { min: number; max: number };
  color?: string;
  seed?: number; // For deterministic randomness
}

export interface GridConfig {
  enabled: boolean;
  size: number; // Grid cell size in pixels
  color?: string;
  opacity?: number;
  speed?: number;
}

export interface OrbConfig {
  enabled: boolean;
  count: number;
  size: { min: number; max: number };
  colors: string[];
  positions: Array<{ left: string; top: string }>;
  animation: {
    duration: number;
    delay?: number;
    path: Array<{ x: number; y: number; scale: number }>;
  };
}

export interface BackgroundAnimationConfig {
  type: AnimationType;
  gradient?: GradientConfig;
  animation?: AnimationConfig;
  overlay?: {
    waves?: WaveConfig;
    particles?: ParticleConfig;
    grid?: GridConfig;
    orbs?: OrbConfig;
  };
}

/**
 * Default animation configs for common patterns
 */
export const defaultAnimationConfigs: Record<string, BackgroundAnimationConfig> = {
  heroAnimated: {
    type: "animated-gradient",
    gradient: {
      colors: ["#4f46e5", "#ec4899", "#3b82f6"],
      angle: 135,
    },
    animation: {
      speed: 1.0,
      direction: "diagonal",
      easing: "ease",
      loop: true,
    },
    overlay: {
      particles: {
        enabled: true,
        count: 50,
        size: { min: 1, max: 3 },
        speed: { min: 0.2, max: 0.5 },
        opacity: { min: 0.2, max: 0.7 },
        color: "255, 255, 255",
        seed: 12345,
      },
      grid: {
        enabled: true,
        size: 50,
        color: "#ffffff",
        opacity: 0.1,
        speed: 1.0,
      },
      orbs: {
        enabled: true,
        count: 2,
        size: { min: 384, max: 384 }, // w-96 = 384px
        colors: ["rgba(79, 70, 229, 0.4)", "rgba(236, 72, 153, 0.4)"],
        positions: [
          { left: "10%", top: "20%" },
          { right: "10%", bottom: "20%" },
        ],
        animation: {
          duration: 8,
          delay: 0,
          path: [
            { x: 0, y: 0, scale: 1 },
            { x: 50, y: 30, scale: 1.2 },
            { x: 0, y: 0, scale: 1 },
          ],
        },
      },
    },
  },
  heroAdvanced: {
    type: "animated-gradient",
    gradient: {
      colors: ["#4f46e5", "#ec4899", "#22c55e"],
      angle: 135,
    },
    animation: {
      speed: 1.2,
      direction: "diagonal",
      easing: "ease-in-out",
      loop: true,
    },
    overlay: {
      grid: {
        enabled: true,
        size: 50,
        color: "#ffffff",
        opacity: 0.1,
        speed: 1.0,
      },
      particles: {
        enabled: true,
        count: 80,
        size: { min: 1, max: 2 },
        speed: { min: 0.3, max: 0.6 },
        opacity: { min: 0.3, max: 0.8 },
        color: "255, 255, 255",
        seed: 12345,
      },
      orbs: {
        enabled: true,
        count: 5,
        size: { min: 128, max: 384 }, // w-32 to w-96
        colors: [
          "rgba(255, 255, 255, 0.15)",
          "rgba(255, 255, 255, 0.15)",
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0.05)",
        ],
        positions: [
          { left: "20%", top: "30%" },
          { left: "35%", top: "70%" },
          { left: "50%", top: "30%" },
          { left: "65%", top: "70%" },
          { left: "80%", top: "30%" },
        ],
        animation: {
          duration: 8,
          delay: 0,
          path: [
            { x: 0, y: 0, scale: 1 },
            { x: 0, y: -50, scale: 1.2 },
            { x: 0, y: 0, scale: 1 },
          ],
        },
      },
    },
  },
};

/**
 * Get default config for a section type
 */
export function getDefaultAnimationConfig(sectionType: string): BackgroundAnimationConfig {
  return defaultAnimationConfigs[sectionType] || {
    type: "none",
    gradient: {
      colors: ["#0f172a"],
    },
  };
}

/**
 * Merge user config with defaults
 */
export function mergeAnimationConfig(
  userConfig: Partial<BackgroundAnimationConfig>,
  defaultConfig: BackgroundAnimationConfig
): BackgroundAnimationConfig {
  return {
    ...defaultConfig,
    ...userConfig,
    gradient: {
      ...defaultConfig.gradient,
      ...userConfig.gradient,
    },
    animation: {
      ...defaultConfig.animation,
      ...userConfig.animation,
    },
    overlay: {
      ...defaultConfig.overlay,
      ...userConfig.overlay,
      waves: userConfig.overlay?.waves 
        ? { ...defaultConfig.overlay?.waves, ...userConfig.overlay.waves }
        : defaultConfig.overlay?.waves,
      particles: userConfig.overlay?.particles
        ? { ...defaultConfig.overlay?.particles, ...userConfig.overlay.particles }
        : defaultConfig.overlay?.particles,
      grid: userConfig.overlay?.grid
        ? { ...defaultConfig.overlay?.grid, ...userConfig.overlay.grid }
        : defaultConfig.overlay?.grid,
      orbs: userConfig.overlay?.orbs
        ? { ...defaultConfig.overlay?.orbs, ...userConfig.overlay.orbs }
        : defaultConfig.overlay?.orbs,
    },
  };
}

