/**
 * Animation Renderer
 * 
 * Shared utilities for rendering animations in both builder and export.
 * These functions generate CSS, JS, and HTML that work identically.
 * 
 * NOTE: This file is now primarily for static CSS generation.
 * Time-driven animations use the resolver system.
 */

import { BackgroundAnimationConfig, AnimationType } from "./config";
import { resolveBackgroundAnimation, generateStaticAnimationCSS } from "./resolver";
import { generateCanvasLoopJS } from "./canvasLoop";
import { getAnimationTime } from "./runtime";

/**
 * Generate CSS keyframes for animations (static fallback)
 * For time-driven animations, use resolver instead
 */
export function generateAnimationCSS(config: BackgroundAnimationConfig): string {
  // Use static CSS generator from resolver
  return generateStaticAnimationCSS(config);
}

/**
 * Generate inline styles for gradient background
 * Uses resolver for time-driven animation
 */
export function generateGradientStyle(config: BackgroundAnimationConfig): React.CSSProperties {
  // Use resolver for time-driven animation
  const resolved = resolveBackgroundAnimation(config);
  return resolved.style;
}

/**
 * Generate JavaScript for canvas particle animation
 */
export function generateParticleJS(config: BackgroundAnimationConfig, canvasId: string): string {
  // Use shared canvas loop generator
  return generateCanvasLoopJS(config, canvasId);
}

/**
 * Generate HTML for grid overlay
 */
export function generateGridHTML(config: BackgroundAnimationConfig): string {
  const grid = config.overlay?.grid;
  if (!grid?.enabled) return "";

  const size = grid.size || 50;
  const color = grid.color || "255, 255, 255";
  const opacity = grid.opacity || 0.1;

  return `<div class="absolute inset-0 opacity-${Math.round(opacity * 10)} animate-grid" style="background-image: linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px); background-size: ${size}px ${size}px; z-index: 1;"></div>`;
}

/**
 * Generate HTML for orbs (for static HTML export)
 */
export function generateOrbsHTML(config: BackgroundAnimationConfig): string {
  // Use resolver to get HTML with time-driven positions
  const resolved = resolveBackgroundAnimation(config);
  return resolved.html || "";
}

/**
 * Generate canvas element for particles
 */
export function generateParticleCanvas(config: BackgroundAnimationConfig, canvasId: string): string {
  const particles = config.overlay?.particles;
  if (!particles?.enabled) return "";

  const opacity = 0.3; // Default canvas opacity

  return `<canvas id="${canvasId}" data-particle class="absolute inset-0 w-full h-full opacity-${Math.round(opacity * 10)}" style="pointer-events: none; z-index: 1;"></canvas>`;
}

