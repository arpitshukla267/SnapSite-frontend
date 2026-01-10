/**
 * Particle Dots Background
 * 
 * Small dots that move in a grid-like pattern with smooth motion.
 */

"use client";

import { useEffect, useRef } from "react";

interface ParticleDotsProps {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  size?: number;
  className?: string;
}

export default function ParticleDots({
  count = 200,
  speed = 0.2,
  color = "255, 255, 255",
  opacity = 0.5,
  size = 2,
  className = "",
}: ParticleDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resize();

    // Calculate grid spacing
    const getGridSpacing = () => {
      const rect = canvas.getBoundingClientRect();
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      return {
        cols,
        rows,
        spacingX: rect.width / cols,
        spacingY: rect.height / rows,
      };
    };
    
    let grid = getGridSpacing();

    // Generate dots
    const dots: Array<{
      baseX: number;
      baseY: number;
      offsetX: number;
      offsetY: number;
      speedX: number;
      speedY: number;
      radius: number;
    }> = [];

    const generateDots = () => {
      dots.length = 0;
      grid = getGridSpacing();
      for (let i = 0; i < count; i++) {
        const col = i % grid.cols;
        const row = Math.floor(i / grid.cols);
        dots.push({
          baseX: col * grid.spacingX + grid.spacingX / 2,
          baseY: row * grid.spacingY + grid.spacingY / 2,
          offsetX: 0,
          offsetY: 0,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          radius: size + Math.random() * 1,
        });
      }
    };
    
    generateDots();

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      dots.forEach((dot) => {
        // Update offset with smooth motion
        dot.offsetX += dot.speedX;
        dot.offsetY += dot.speedY;

        // Constrain offset
        const maxOffset = Math.min(grid.spacingX, grid.spacingY) * 0.3;
        if (Math.abs(dot.offsetX) > maxOffset) dot.speedX *= -1;
        if (Math.abs(dot.offsetY) > maxOffset) dot.speedY *= -1;

        // Calculate position
        const x = dot.baseX + dot.offsetX;
        const y = dot.baseY + dot.offsetY;

        // Draw dot
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Use ResizeObserver for better container tracking
    const resizeObserver = new ResizeObserver(() => {
      resize();
      generateDots();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, opacity, size]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${className}`}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}


