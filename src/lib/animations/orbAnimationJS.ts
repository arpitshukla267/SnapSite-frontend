/**
 * Orb Animation JavaScript Generator
 * 
 * Generates JavaScript to animate orbs in HTML export.
 * Uses time-driven animation for exact parity with builder.
 */

import { BackgroundAnimationConfig } from "./config";

/**
 * Generate JavaScript to animate orbs
 */
export function generateOrbAnimationJS(config: BackgroundAnimationConfig): string {
  const orbs = config.overlay?.orbs;
  if (!orbs?.enabled) return "";

  return `
(function() {
  'use strict';
  
  function getAnimationTime() {
    if (typeof window !== 'undefined' && window.performance) {
      return window.performance.now() / 1000;
    }
    return Date.now() / 1000;
  }

  function getAnimationProgress(duration, offset, loop) {
    const time = getAnimationTime();
    const elapsed = (time - offset) % (loop ? duration : duration * 2);
    if (!loop && elapsed > duration) return 1;
    return (elapsed / duration) % 1;
  }

  function applyEasing(t, type) {
    const easings = {
      linear: t => t,
      ease: t => t * (2 - t),
      'ease-in': t => t * t,
      'ease-out': t => t * (2 - t),
      'ease-in-out': t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    };
    return (easings[type] || easings.linear)(t);
  }

  function interpolate(start, end, progress) {
    return start + (end - start) * progress;
  }

  const orbs = document.querySelectorAll('.float-orb');
  if (orbs.length === 0) return;

  const orbConfigs = ${JSON.stringify(orbs.positions.map((pos, index) => ({
    index,
    duration: orbs.animation.duration || 8,
    delay: (orbs.animation.delay || 0) + index * 0.5,
    path: orbs.animation.path || [
      { x: 0, y: 0, scale: 1 },
      { x: 50, y: 30, scale: 1.2 },
      { x: 0, y: 0, scale: 1 },
    ],
  })))};

  function animateOrbs() {
    orbs.forEach(function(orb, index) {
      const config = orbConfigs[index];
      if (!config) return;

      const progress = getAnimationProgress(config.duration, config.delay, true);
      const easedProgress = applyEasing(progress, 'ease-in-out');
      
      const segmentIndex = Math.floor(easedProgress * (config.path.length - 1));
      const segmentProgress = (easedProgress * (config.path.length - 1)) % 1;
      const current = config.path[segmentIndex];
      const next = config.path[Math.min(segmentIndex + 1, config.path.length - 1)];

      const x = interpolate(current.x, next.x, segmentProgress);
      const y = interpolate(current.y, next.y, segmentProgress);
      const scale = interpolate(current.scale, next.scale, segmentProgress);

      orb.style.transform = \`translate(\${x}px, \${y}px) scale(\${scale})\`;
    });

    requestAnimationFrame(animateOrbs);
  }

  animateOrbs();
})();
`;
}

