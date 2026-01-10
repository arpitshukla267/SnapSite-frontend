/**
 * Canvas Animation Loop
 * 
 * Time-driven canvas animation that works identically in builder and export.
 * No useEffect, no editor dependencies.
 */

import { getAnimationTime } from "./runtime";
import { resolveBackgroundAnimation, ResolvedBackground } from "./resolver";
import { BackgroundAnimationConfig } from "./config";

/**
 * Start canvas animation loop
 * Returns cleanup function
 */
export function startCanvasLoop(
  canvas: HTMLCanvasElement,
  config: BackgroundAnimationConfig,
  canvasId: string,
  startTime?: number
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const initialTime = startTime ?? getAnimationTime();
  let animationFrameId: number;
  let isRunning = true;

  const loop = () => {
    if (!isRunning) return;

    const currentTime = getAnimationTime();
    const resolved = resolveBackgroundAnimation(config, canvasId, initialTime);

    if (resolved.canvas) {
      resolved.canvas.draw(ctx, currentTime);
    }

    animationFrameId = requestAnimationFrame(loop);
  };

  // Start loop
  loop();

  // Handle resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", handleResize);

  // Return cleanup
  return () => {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener("resize", handleResize);
  };
}

/**
 * Generate JavaScript code for canvas loop (for HTML export)
 */
export function generateCanvasLoopJS(
  config: BackgroundAnimationConfig,
  canvasId: string
): string {
  const particles = config.overlay?.particles;
  if (!particles?.enabled) return "";

  const count = particles.count || 50;
  const sizeMin = particles.size.min || 1;
  const sizeMax = particles.size.max || 3;
  const speedMin = particles.speed.min || 0.2;
  const speedMax = particles.speed.max || 0.5;
  const opacityMin = particles.opacity.min || 0.2;
  const opacityMax = particles.opacity.max || 0.7;
  const color = particles.color || "255, 255, 255";
  const seed = particles.seed || 1234;

  return `
(function() {
  'use strict';
  
  const canvas = document.getElementById('${canvasId}');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Seeded random for deterministic particles
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function seededRandomRange(seed, min, max) {
    return min + seededRandom(seed) * (max - min);
  }

  // Generate particles
  const particles = [];
  for (let i = 0; i < ${count}; i++) {
    const particleSeed = ${seed} + i;
    particles.push({
      x: seededRandom(particleSeed * 7) * 100,
      y: seededRandom(particleSeed * 11) * 100,
      radius: seededRandomRange(particleSeed * 13, ${sizeMin}, ${sizeMax}),
      vx: (seededRandom(particleSeed * 17) - 0.5) * ${speedMax},
      vy: (seededRandom(particleSeed * 19) - 0.5) * ${speedMax},
      opacity: seededRandomRange(particleSeed * 23, ${opacityMin}, ${opacityMax}),
      seed: particleSeed,
    });
  }

  const startTime = performance.now() / 1000;
  let animationFrameId;

  function loop() {
    const currentTime = performance.now() / 1000;
    const elapsed = currentTime - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function(particle) {
      const width = canvas.width;
      const height = canvas.height;
      
      let x = (particle.x / 100) * width + particle.vx * elapsed * 100;
      let y = (particle.y / 100) * height + particle.vy * elapsed * 100;

      if (x < 0) x = width;
      if (x > width) x = 0;
      if (y < 0) y = height;
      if (y > height) y = 0;

      ctx.beginPath();
      ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(${color}, ' + particle.opacity + ')';
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();
`;
}

