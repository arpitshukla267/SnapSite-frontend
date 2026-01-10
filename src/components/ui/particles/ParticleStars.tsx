/**
 * Particle Stars Background
 * 
 * A starfield effect with twinkling stars that move slowly across the screen.
 */

"use client";

import { useEffect, useRef } from "react";

interface ParticleStarsProps {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export default function ParticleStars({
  count = 100,
  speed = 0.2,
  color = "255, 255, 255",
  opacity = 0.8,
  className = "",
}: ParticleStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size relative to container
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    // Initial resize
    resize();

    // Generate stars
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    const generateStars = () => {
      stars.length = 0;
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          radius: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };
    
    generateStars();

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += speed;

      const rect = canvas.getBoundingClientRect();
      stars.forEach((star) => {
        // Twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = opacity * twinkle;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
        ctx.fill();

        // Move star slowly
        star.x += speed * 0.1;
        if (star.x > rect.width) {
          star.x = 0;
          star.y = Math.random() * rect.height;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Use ResizeObserver for better container tracking
    const resizeObserver = new ResizeObserver(() => {
      resize();
      generateStars();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, opacity]);

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


