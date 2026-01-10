/**
 * Shared Animation Runtime
 * 
 * This runtime is used by builder, Next.js export, and HTML export.
 * All animations are time-driven and deterministic.
 * No side effects, no state, no editor dependencies.
 */

/**
 * Get current animation time in seconds
 * Uses performance.now() for precision, falls back to Date.now()
 */
export function getAnimationTime(): number {
  if (typeof window !== 'undefined' && window.performance) {
    return window.performance.now() / 1000;
  }
  return Date.now() / 1000;
}

/**
 * Get animation progress (0-1) for a given duration and offset
 */
export function getAnimationProgress(
  duration: number,
  offset: number = 0,
  loop: boolean = true
): number {
  const time = getAnimationTime();
  const elapsed = (time - offset) % (loop ? duration : duration * 2);
  
  if (!loop && elapsed > duration) {
    return 1; // Hold at end
  }
  
  return (elapsed / duration) % 1;
}

/**
 * Easing functions (pure, no side effects)
 */
export const easing = {
  linear: (t: number) => t,
  ease: (t: number) => t * (2 - t),
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};

/**
 * Apply easing to progress
 */
export function applyEasing(
  progress: number,
  easingType: keyof typeof easing = 'linear'
): number {
  return easing[easingType](progress);
}

/**
 * Interpolate between two values
 */
export function interpolate(
  start: number,
  end: number,
  progress: number
): number {
  return start + (end - start) * progress;
}

/**
 * Interpolate color between two hex colors
 */
export function interpolateColor(
  color1: string,
  color2: string,
  progress: number
): string {
  // Remove # if present
  const c1 = color1.replace('#', '');
  const c2 = color2.replace('#', '');
  
  // Parse RGB
  const r1 = parseInt(c1.substring(0, 2), 16);
  const g1 = parseInt(c1.substring(2, 4), 16);
  const b1 = parseInt(c1.substring(4, 6), 16);
  
  const r2 = parseInt(c2.substring(0, 2), 16);
  const g2 = parseInt(c2.substring(2, 4), 16);
  const b2 = parseInt(c2.substring(4, 6), 16);
  
  const r = Math.round(interpolate(r1, r2, progress));
  const g = Math.round(interpolate(g1, g2, progress));
  const b = Math.round(interpolate(b1, b2, progress));
  
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Generate seeded random number (deterministic)
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate seeded random in range
 */
export function seededRandomRange(
  seed: number,
  min: number,
  max: number
): number {
  return min + seededRandom(seed) * (max - min);
}

