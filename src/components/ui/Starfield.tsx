"use client";
import React, { useRef, useEffect, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Grid {
  points: { x: number; y: number; baseY: number }[];
}

const ProfessionalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const gridRef = useRef<Grid | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const [config, setConfig] = React.useState({
    particleCount: 60,
    gridSpacing: 60,
  });

  useEffect(() => {
    setConfig({
      particleCount: window.innerWidth < 768 ? 30 : 60,
      gridSpacing: 60,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();

    const initGrid = () => {
      const points = [];
      const cols = Math.ceil(canvas.width / config.gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / config.gridSpacing) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * config.gridSpacing;
          const y = j * config.gridSpacing;
          points.push({ x, y, baseY: y });
        }
      }
      gridRef.current = { points };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    particlesRef.current = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const draw = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;
      timeRef.current += deltaTime * 0.001;

      const { width, height } = canvas;
      const mouse = mouseRef.current;

      // Sophisticated dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#0a0a0f");
      bgGradient.addColorStop(0.5, "#050508");
      bgGradient.addColorStop(1, "#000000");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid with perspective distortion
      if (gridRef.current && width >= 768) {
        ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
        ctx.lineWidth = 0.5;

        gridRef.current.points.forEach((point) => {
          const dx = mouse.x - point.x;
          const dy = mouse.y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const distortAmount = (1 - dist / 200) * 15;
            point.y = point.baseY + Math.sin(timeRef.current * 2 + point.x * 0.01) * distortAmount;
          } else {
            point.y = point.baseY + Math.sin(timeRef.current + point.x * 0.01) * 2;
          }
        });

        // Draw horizontal lines
        const rows = Math.ceil(height / config.gridSpacing);
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          const rowPoints = gridRef.current.points.filter(
            (p) => Math.abs(p.baseY - j * config.gridSpacing) < 1
          );
          rowPoints.sort((a, b) => a.x - b.x);
          rowPoints.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        }

        // Draw vertical lines
        const cols = Math.ceil(width / config.gridSpacing);
        for (let i = 0; i < cols; i++) {
          ctx.beginPath();
          const colPoints = gridRef.current.points.filter(
            (p) => Math.abs(p.x - i * config.gridSpacing) < 1
          );
          colPoints.sort((a, b) => a.baseY - b.baseY);
          colPoints.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        }
      }

      // Draw minimal, elegant particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle particle glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Minimal connections - only close particles
      if (width >= 768) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p1 = particlesRef.current[i];
          
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            
            if (distSq < 10000) { // 100px
              const dist = Math.sqrt(distSq);
              const opacity = (1 - dist / 100) * 0.1;
              
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Subtle accent light from corner
      const accentGradient = ctx.createRadialGradient(
        width * 0.85, height * 0.15, 0,
        width * 0.85, height * 0.15, width * 0.6
      );
      accentGradient.addColorStop(0, "rgba(99, 102, 241, 0.03)");
      accentGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.015)");
      accentGradient.addColorStop(1, "transparent");
      ctx.fillStyle = accentGradient;
      ctx.fillRect(0, 0, width, height);

      // Bottom gradient for depth
      const bottomGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
      bottomGradient.addColorStop(0, "transparent");
      bottomGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [config]);

  return (
    <div className="fixed z-0 inset-0 w-full h-full overflow-hidden bg-black">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-black/40 pointer-events-none" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Enhanced noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated gradient orbs for depth */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default ProfessionalBackground;