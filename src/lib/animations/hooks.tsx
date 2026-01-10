/**
 * React Hooks for Animations
 * 
 * Builder-specific hooks that use the shared resolver system.
 * These work identically to the exported static versions.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundAnimationConfig } from "./config";
import { resolveBackgroundAnimation } from "./resolver";
import { startCanvasLoop } from "./canvasLoop";
import { getAnimationTime } from "./runtime";

/**
 * Hook for canvas particle animation
 * Uses shared resolver and canvas loop for exact parity with export
 */
export function useParticleCanvas(
  config: BackgroundAnimationConfig,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = config.overlay?.particles;
    if (!particles?.enabled) return;

    const canvasId = canvas.id || `particle-canvas-${Date.now()}`;
    if (!canvas.id) canvas.id = canvasId;

    // Use shared canvas loop (same as export)
    const cleanup = startCanvasLoop(canvas, config, canvasId);

    return cleanup;
  }, [config, canvasRef]);
}

/**
 * Hook for mouse tracking (optional, for parallax effects)
 */
export function useMousePosition(enabled: boolean = false) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  return mousePos;
}

/**
 * Component for animated gradient background
 * Uses resolver for time-driven animation
 */
export function AnimatedGradientBackground({ config }: { config: BackgroundAnimationConfig }) {
  const [style, setStyle] = useState<React.CSSProperties>(() => {
    // Initial style from resolver
    const resolved = resolveBackgroundAnimation(config);
    return resolved.style;
  });

  useEffect(() => {
    // Update style on animation frame for smooth animation
    let animationFrameId: number;
    
    const updateStyle = () => {
      const resolved = resolveBackgroundAnimation(config);
      setStyle(resolved.style);
      animationFrameId = requestAnimationFrame(updateStyle);
    };

    animationFrameId = requestAnimationFrame(updateStyle);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return <div className="absolute inset-0" style={style} />;
}

/**
 * Component for floating orbs
 * Uses resolver for time-driven animation (no Framer Motion for export parity)
 */
export function FloatingOrbs({ config }: { config: BackgroundAnimationConfig }) {
  const orbs = config.overlay?.orbs;
  if (!orbs?.enabled) return null;

  const [orbStyles, setOrbStyles] = useState<Array<React.CSSProperties>>(() => {
    const resolved = resolveBackgroundAnimation(config);
    // Initial styles will be computed in effect
    return orbs.positions.map(() => ({}));
  });

  useEffect(() => {
    let animationFrameId: number;
    
    const updateStyles = () => {
      const resolved = resolveBackgroundAnimation(config);
      // For orbs, we need to compute positions from time
      const styles = orbs.positions.map((pos, index) => {
        const color = orbs.colors[index] || orbs.colors[0] || "rgba(79, 70, 229, 0.4)";
        const path = orbs.animation.path || [
          { x: 0, y: 0, scale: 1 },
          { x: 50, y: 30, scale: 1.2 },
          { x: 0, y: 0, scale: 1 },
        ];
        const duration = orbs.animation.duration || 8;
        const delay = (orbs.animation.delay || 0) + index * 0.5;
        
        // Use resolver to get current time-based position
        const time = getAnimationTime();
        const resolvedAtTime = resolveBackgroundAnimation(config, undefined, time);
        
        // Calculate orb position (simplified - full implementation in resolver)
        const progress = ((time - delay) % duration) / duration;
        const segmentIndex = Math.floor(progress * (path.length - 1));
        const segmentProgress = (progress * (path.length - 1)) % 1;
        const current = path[segmentIndex];
        const next = path[Math.min(segmentIndex + 1, path.length - 1)];
        
        const x = current.x + (next.x - current.x) * segmentProgress;
        const y = current.y + (next.y - current.y) * segmentProgress;
        const scale = current.scale + (next.scale - current.scale) * segmentProgress;

        return {
          background: `radial-gradient(circle, ${color}, transparent)`,
          left: (pos as any).left,
          top: (pos as any).top,
          right: (pos as any).right,
          bottom: (pos as any).bottom,
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
        };
      });
      
      setOrbStyles(styles);
      animationFrameId = requestAnimationFrame(updateStyles);
    };

    animationFrameId = requestAnimationFrame(updateStyles);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config, orbs]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {orbs.positions.map((pos, index) => (
        <div
          key={index}
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={orbStyles[index]}
        />
      ))}
    </div>
  );
}

/**
 * Component for animated grid
 * Uses resolver for time-driven animation (no Framer Motion for export parity)
 */
export function AnimatedGrid({ config }: { config: BackgroundAnimationConfig }) {
  const grid = config.overlay?.grid;
  if (!grid?.enabled) return null;

  const [style, setStyle] = useState<React.CSSProperties>(() => {
    const resolved = resolveBackgroundAnimation(config);
    return resolved.style;
  });

  useEffect(() => {
    let animationFrameId: number;
    
    const updateStyle = () => {
      const resolved = resolveBackgroundAnimation(config);
      // Extract grid-specific styles
      const gridStyle: React.CSSProperties = {
        backgroundImage: resolved.style.backgroundImage,
        backgroundSize: resolved.style.backgroundSize,
        backgroundPosition: resolved.style.backgroundPosition,
        zIndex: 1,
        opacity: 0.1,
      };
      setStyle(gridStyle);
      animationFrameId = requestAnimationFrame(updateStyle);
    };

    animationFrameId = requestAnimationFrame(updateStyle);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return <div className="absolute inset-0 opacity-10" style={style} />;
}

