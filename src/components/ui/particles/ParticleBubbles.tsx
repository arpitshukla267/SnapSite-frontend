/**
 * Particle Bubbles Background
 * 
 * Floating bubbles that rise from the bottom with varying sizes and speeds.
 */

"use client";

import { useEffect, useRef } from "react";

interface ParticleBubblesProps {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  maxSize?: number;
  className?: string;
}

export default function ParticleBubbles({
  count = 30,
  speed = 0.5,
  color = "255, 255, 255",
  opacity = 0.3,
  maxSize = 60,
  className = "",
}: ParticleBubblesProps) {
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

    // Generate bubbles
    const bubbles: Array<{
      x: number;
      y: number;
      radius: number;
      vy: number;
      opacity: number;
    }> = [];

    const generateBubbles = () => {
      bubbles.length = 0;
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * rect.width,
          y: rect.height + Math.random() * 200,
          radius: Math.random() * (maxSize / 2) + 10,
          vy: -(Math.random() * speed + 0.2),
          opacity: Math.random() * opacity + 0.1,
        });
      }
    };
    
    generateBubbles();

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      
      bubbles.forEach((bubble) => {
        // Update position
        bubble.y += bubble.vy * speed;

        // Reset if off screen
        if (bubble.y + bubble.radius < 0) {
          bubble.y = rect.height + bubble.radius;
          bubble.x = Math.random() * rect.width;
        }

        // Draw bubble with gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `rgba(${color}, ${bubble.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw bubble outline
        ctx.strokeStyle = `rgba(${color}, ${bubble.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Use ResizeObserver for better container tracking
    const resizeObserver = new ResizeObserver(() => {
      resize();
      generateBubbles();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, opacity, maxSize]);

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


