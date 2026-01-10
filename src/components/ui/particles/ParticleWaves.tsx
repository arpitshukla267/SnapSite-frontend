/**
 * Particle Waves Background
 * 
 * Particles that move in wave-like patterns creating flowing motion.
 */

"use client";

import { useEffect, useRef } from "react";

interface ParticleWavesProps {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  className?: string;
}

export default function ParticleWaves({
  count = 80,
  speed = 0.3,
  color = "255, 255, 255",
  opacity = 0.4,
  waveAmplitude = 50,
  waveFrequency = 0.02,
  className = "",
}: ParticleWavesProps) {
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

    // Generate particles in rows
    const getParticleLayout = () => {
      const rect = canvas.getBoundingClientRect();
      const rows = Math.ceil(Math.sqrt(count));
      const particlesPerRow = Math.ceil(count / rows);
      return {
        rows,
        particlesPerRow,
        spacingX: rect.width / particlesPerRow,
        spacingY: rect.height / rows,
      };
    };
    
    let layout = getParticleLayout();

    const particles: Array<{
      baseX: number;
      baseY: number;
      radius: number;
      waveOffset: number;
    }> = [];

    const generateParticles = () => {
      particles.length = 0;
      layout = getParticleLayout();
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / layout.particlesPerRow);
        const col = i % layout.particlesPerRow;
        particles.push({
          baseX: col * layout.spacingX + layout.spacingX / 2,
          baseY: row * layout.spacingY + layout.spacingY / 2,
          radius: Math.random() * 2 + 1.5,
          waveOffset: Math.random() * Math.PI * 2,
        });
      }
    };
    
    generateParticles();

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += speed * 0.01;

      particles.forEach((particle) => {
        // Calculate wave motion
        const waveX = Math.sin(time * waveFrequency + particle.waveOffset) * waveAmplitude;
        const waveY = Math.cos(time * waveFrequency * 0.7 + particle.waveOffset) * waveAmplitude * 0.5;

        const x = particle.baseX + waveX;
        const y = particle.baseY + waveY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();

        // Draw connection to nearby particles
        particles.forEach((other) => {
          if (other === particle) return;
          const dx = x - (other.baseX + Math.sin(time * waveFrequency + other.waveOffset) * waveAmplitude);
          const dy = y - (other.baseY + Math.cos(time * waveFrequency * 0.7 + other.waveOffset) * waveAmplitude * 0.5);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const lineOpacity = (1 - distance / 100) * opacity * 0.2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
              other.baseX + Math.sin(time * waveFrequency + other.waveOffset) * waveAmplitude,
              other.baseY + Math.cos(time * waveFrequency * 0.7 + other.waveOffset) * waveAmplitude * 0.5
            );
            ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Use ResizeObserver for better container tracking
    const resizeObserver = new ResizeObserver(() => {
      resize();
      generateParticles();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, opacity, waveAmplitude, waveFrequency]);

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


