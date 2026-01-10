/**
 * Unified Background Animation Resolver
 * 
 * Single source of truth for all background animations.
 * Computes visuals from time - no side effects, no state.
 * Works identically in builder, Next.js, and HTML export.
 */

import { BackgroundAnimationConfig } from "./config";
import {
  getAnimationTime,
  getAnimationProgress,
  applyEasing,
  interpolate,
  seededRandom,
  seededRandomRange,
} from "./runtime";

export interface ResolvedBackground {
  style: React.CSSProperties;
  canvas?: {
    id: string;
    width: number;
    height: number;
    draw: (ctx: CanvasRenderingContext2D, time: number) => void;
  };
  svg?: string;
  html?: string;
}

/**
 * Resolve gradient animation
 */
function resolveGradient(
  config: BackgroundAnimationConfig,
  time: number
): React.CSSProperties {
  const { gradient, animation } = config;
  if (!gradient || gradient.colors.length < 2) {
    return gradient?.colors?.[0] 
      ? { backgroundColor: gradient.colors[0] }
      : {};
  }

  const angle = gradient.angle || 135;
  const colors = gradient.colors.join(", ");
  const speed = animation?.speed || 1.0;
  const easingType = (animation?.easing || "ease") as keyof typeof import("./runtime").easing;
  
  // Calculate background position based on time
  const duration = 15 / speed;
  const progress = getAnimationProgress(duration, 0, animation?.loop !== false);
  const easedProgress = applyEasing(progress, easingType);
  
  // Map progress to background position (0% to 100%)
  const position = easedProgress * 100;

  // Use separate properties instead of shorthand to avoid conflicts
  return {
    backgroundImage: `linear-gradient(${angle}deg, ${colors})`,
    backgroundSize: "400% 400%",
    backgroundPosition: `${position}% 50%`,
    backgroundRepeat: "no-repeat",
  };
}

/**
 * Resolve particle canvas animation
 */
function resolveParticles(
  config: BackgroundAnimationConfig,
  canvasId: string,
  time: number
): ResolvedBackground["canvas"] {
  const particles = config.overlay?.particles;
  if (!particles?.enabled) return undefined;

  const count = particles.count || 50;
  const sizeMin = particles.size.min || 1;
  const sizeMax = particles.size.max || 3;
  const speedMin = particles.speed.min || 0.2;
  const speedMax = particles.speed.max || 0.5;
  const opacityMin = particles.opacity.min || 0.2;
  const opacityMax = particles.opacity.max || 0.7;
  const color = particles.color || "255, 255, 255";
  const seed = particles.seed || 1234;

  // Generate deterministic particles
  const particleArray: Array<{
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    opacity: number;
    seed: number;
  }> = [];

  for (let i = 0; i < count; i++) {
    const particleSeed = seed + i;
    particleArray.push({
      x: seededRandom(particleSeed * 7) * 100, // Percentage
      y: seededRandom(particleSeed * 11) * 100,
      radius: seededRandomRange(particleSeed * 13, sizeMin, sizeMax),
      vx: (seededRandom(particleSeed * 17) - 0.5) * speedMax,
      vy: (seededRandom(particleSeed * 19) - 0.5) * speedMax,
      opacity: seededRandomRange(particleSeed * 23, opacityMin, opacityMax),
      seed: particleSeed,
    });
  }

  return {
    id: canvasId,
    width: 0, // Set by component
    height: 0, // Set by component
    draw: (ctx: CanvasRenderingContext2D, currentTime: number) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      ctx.clearRect(0, 0, width, height);

      particleArray.forEach((particle) => {
        // Calculate position based on time and velocity
        const elapsed = currentTime - time;
        let x = (particle.x / 100) * width + particle.vx * elapsed * 100;
        let y = (particle.y / 100) * height + particle.vy * elapsed * 100;

        // Wrap around edges
        if (x < 0) x = width;
        if (x > width) x = 0;
        if (y < 0) y = height;
        if (y > height) y = 0;

        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        ctx.fill();
      });
    },
  };
}

/**
 * Resolve grid animation
 */
function resolveGrid(
  config: BackgroundAnimationConfig,
  time: number
): React.CSSProperties {
  const grid = config.overlay?.grid;
  if (!grid?.enabled) return {};

  const size = grid.size || 50;
  const color = grid.color || "255, 255, 255";
  const opacity = grid.opacity || 0.1;
  const speed = grid.speed || 1.0;

  // Calculate grid position based on time
  const duration = 20 / speed;
  const progress = getAnimationProgress(duration, 0, true);
  const position = progress * size;

  return {
    backgroundImage: `
      linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: `${position}px ${position}px`,
  };
}

/**
 * Resolve orb positions (for static HTML export)
 */
function resolveOrbsHTML(
  config: BackgroundAnimationConfig,
  time: number
): string {
  const orbs = config.overlay?.orbs;
  if (!orbs?.enabled) return "";

  return orbs.positions
    .map((pos, index) => {
      const color = orbs.colors[index] || orbs.colors[0] || "rgba(79, 70, 229, 0.4)";
      const path = orbs.animation.path || [
        { x: 0, y: 0, scale: 1 },
        { x: 50, y: 30, scale: 1.2 },
        { x: 0, y: 0, scale: 1 },
      ];
      const duration = orbs.animation.duration || 8;
      const delay = (orbs.animation.delay || 0) + index * 0.5;

      // Calculate current position from time
      const progress = getAnimationProgress(duration, delay, true);
      const easedProgress = applyEasing(progress, "ease-in-out");
      
      // Interpolate between path points
      const segmentIndex = Math.floor(easedProgress * (path.length - 1));
      const segmentProgress = (easedProgress * (path.length - 1)) % 1;
      const current = path[segmentIndex];
      const next = path[Math.min(segmentIndex + 1, path.length - 1)];

      const x = interpolate(current.x, next.x, segmentProgress);
      const y = interpolate(current.y, next.y, segmentProgress);
      const scale = interpolate(current.scale, next.scale, segmentProgress);

      return `    <div class="absolute w-96 h-96 rounded-full blur-3xl opacity-20" style="background: radial-gradient(circle, ${color}, transparent); ${pos.left ? `left: ${pos.left};` : ""} ${pos.top ? `top: ${pos.top};` : ""} ${(pos as any).right ? `right: ${(pos as any).right};` : ""} ${(pos as any).bottom ? `bottom: ${(pos as any).bottom};` : ""} transform: translate(${x}px, ${y}px) scale(${scale});"></div>`;
    })
    .join("\n");
}

/**
 * Main resolver function - computes all background visuals from time
 */
export function resolveBackgroundAnimation(
  config: BackgroundAnimationConfig,
  canvasId?: string,
  time?: number
): ResolvedBackground {
  const currentTime = time ?? getAnimationTime();
  const resolved: ResolvedBackground = {
    style: {},
  };

  // Resolve main background (gradient)
  const gradientStyle = resolveGradient(config, currentTime);
  Object.assign(resolved.style, gradientStyle);

  // Resolve grid overlay
  const gridStyle = resolveGrid(config, currentTime);
  if (Object.keys(gridStyle).length > 0) {
    // Merge grid into main style or create overlay
    Object.assign(resolved.style, gridStyle);
  }

  // Resolve particles (canvas)
  if (canvasId) {
    const canvas = resolveParticles(config, canvasId, currentTime);
    if (canvas) {
      resolved.canvas = canvas;
    }
  }

  // Resolve orbs HTML (for static export)
  const orbsHTML = resolveOrbsHTML(config, currentTime);
  if (orbsHTML) {
    resolved.html = `<div class="absolute inset-0 overflow-hidden" style="z-index: 1;">\n${orbsHTML}\n  </div>`;
  }

  return resolved;
}

/**
 * Generate CSS keyframes for animations (static, no runtime)
 */
export function generateStaticAnimationCSS(config: BackgroundAnimationConfig): string {
  const css: string[] = [];
  const { type, animation, gradient } = config;

  // Gradient animation keyframes
  if (type === "animated-gradient" && gradient && gradient.colors.length >= 2) {
    const duration = animation ? 15 / (animation.speed || 1) : 15;
    css.push(`
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 400% 400%;
  animation: gradientShift ${duration}s ${animation?.easing || "ease"} infinite;
}`);
  }

  // Grid animation keyframes
  if (config.overlay?.grid?.enabled) {
    const gridSpeed = config.overlay.grid.speed || 1.0;
    const duration = 20 / gridSpeed;
    const size = config.overlay.grid.size || 50;
    css.push(`
@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: ${size}px ${size}px; }
}
.animate-grid {
  animation: gridMove ${duration}s linear infinite;
}`);
  }

  return css.join("\n");
}

