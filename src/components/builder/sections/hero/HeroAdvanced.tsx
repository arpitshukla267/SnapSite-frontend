"use client";
import { useEffect, useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useParticleCanvas, AnimatedGradientBackground, AnimatedGrid, FloatingOrbs } from "../../../../lib/animations/hooks";
import { resolveBackgroundAnimation } from "../../../../lib/animations/resolver";
import { getDefaultAnimationConfig, mergeAnimationConfig, BackgroundAnimationConfig } from "../../../../lib/animations/config";
import { ParticleStars, ParticleFloating, ParticleBubbles, ParticleDots, ParticleWaves } from "../../../ui/particles";

export default function HeroAdvanced({ 
  title, 
  subtitle, 
  buttonText, 
  buttonText2,
  badge = "Premium Experience",
  features = ["No Code Required", "AI-Powered", "Fully Responsive", "SEO Optimized", "Fast Loading"],
  enableParticles = true,
  enableGradientAnimation = true,
  enableTextReveal = true,
  onEdit,
  backgroundColor = "#0f172a",
  gradientColors,
  titleColor = "#ffffff",
  subtitleColor = "rgba(255, 255, 255, 0.9)",
  buttonBackground = "#ffffff",
  buttonTextColor = "#1f2937",
  button2Background = "transparent",
  button2TextColor = "#ffffff",
  accentColor,
  animationConfig,
  particleType = "waves",
  particleColor = "255, 255, 255",
  particleOpacity = 0.15,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonText2?: string;
  badge?: string;
  features?: string[];
  enableParticles?: boolean;
  enableGradientAnimation?: boolean;
  enableTextReveal?: boolean;
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  gradientColors?: string[];
  titleColor?: string;
  subtitleColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
  button2Background?: string;
  button2TextColor?: string;
  accentColor?: string;
  animationConfig?: BackgroundAnimationConfig;
  particleType?: "stars" | "floating" | "bubbles" | "dots" | "waves" | "none";
  particleColor?: string;
  particleOpacity?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Get animation config (merge user config with defaults)
  const defaultConfig = getDefaultAnimationConfig("heroAdvanced");
  const userConfig = animationConfig || {};
  const mergedConfig = mergeAnimationConfig(userConfig, defaultConfig);
  
  // Override gradient colors if provided
  if (gradientColors && gradientColors.length >= 2) {
    mergedConfig.gradient = {
      ...mergedConfig.gradient,
      colors: gradientColors,
    };
  }

  // Enable/disable animations based on props
  if (!enableParticles && mergedConfig.overlay?.particles) {
    mergedConfig.overlay.particles.enabled = false;
  }
  if (!enableGradientAnimation) {
    mergedConfig.type = "none";
  }

  // Use new animation hooks
  useParticleCanvas(mergedConfig, canvasRef);
  
  // Resolve background styles
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>(() => {
    const resolved = resolveBackgroundAnimation(mergedConfig);
    return resolved.style;
  });

  // Update background style on animation frame
  useEffect(() => {
    if (!enableGradientAnimation) return;
    
    let animationFrameId: number;
    
    const updateStyle = () => {
      const resolved = resolveBackgroundAnimation(mergedConfig);
      setBackgroundStyle(resolved.style);
      animationFrameId = requestAnimationFrame(updateStyle);
    };

    animationFrameId = requestAnimationFrame(updateStyle);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [mergedConfig, enableGradientAnimation]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const accentRgba = (alpha: number) => {
    if (!accentColor) return `rgba(139, 92, 246, ${alpha})`;
    if (accentColor.startsWith('#')) {
      const r = parseInt(accentColor.slice(1, 3), 16);
      const g = parseInt(accentColor.slice(3, 5), 16);
      const b = parseInt(accentColor.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `${accentColor}${Math.round(alpha * 100)}`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={enableGradientAnimation && (gradientColors && gradientColors.length >= 2) ? {} : { 
        backgroundColor: backgroundColor || "var(--section-background, #0f172a)"
      }}
    >
      {/* Animated Gradient Background - Must be first layer */}
      {enableGradientAnimation && (gradientColors && gradientColors.length >= 2) ? (
        <AnimatedGradientBackground config={mergedConfig} />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: backgroundColor || "var(--section-background, #0f172a)" }} />
      )}

      {/* Animated Canvas Particles */}
      {enableParticles && (
        <canvas
          ref={canvasRef}
          id="particle-canvas-hero-advanced"
          className="absolute inset-0 opacity-30"
          style={{ zIndex: 1, pointerEvents: "none" }}
        />
      )}

      {/* Animated Grid Background */}
      <AnimatedGrid config={mergedConfig} />

      {/* Mouse-based radial gradient overlay */}
      {enableGradientAnimation && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at ${(mousePosition.x + 0.1) * 100}% ${(mousePosition.y + 0.1) * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Floating Orbs - Using export-safe animation system */}
      <FloatingOrbs config={mergedConfig} />

      {/* Additional Particle Background Animation */}
      {particleType !== "none" && (
        <>
          {particleType === "stars" && <ParticleStars count={100} speed={0.2} color={particleColor} opacity={particleOpacity} />}
          {particleType === "floating" && <ParticleFloating count={50} speed={0.3} color={particleColor} opacity={particleOpacity} />}
          {particleType === "bubbles" && <ParticleBubbles count={30} speed={0.5} color={particleColor} opacity={particleOpacity} />}
          {particleType === "dots" && <ParticleDots count={200} speed={0.2} color={particleColor} opacity={particleOpacity} />}
          {particleType === "waves" && <ParticleWaves count={80} speed={0.3} color={particleColor} opacity={particleOpacity} />}
        </>
      )}

      {/* Content */}
      <motion.div 
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Enhanced Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <span 
            className="px-6 py-3 rounded-full backdrop-blur-md border text-sm font-semibold relative overflow-hidden group"
            style={{
              backgroundColor: accentRgba(0.2),
              borderColor: accentRgba(0.4),
              color: titleColor || "#ffffff",
              boxShadow: `0 0 30px ${accentRgba(0.3)}, inset 0 0 20px ${accentRgba(0.1)}`,
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
              <TextEditable onClick={() => onEdit?.("badge")}>
                {badge}
              </TextEditable>
            </span>
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentRgba(0.4)}, transparent)`,
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </motion.div>

        {/* Title with gradient highlight effect */}
        {enableTextReveal ? (
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight relative"
            style={{ color: titleColor || "var(--section-header, #ffffff)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="relative inline-block px-6 py-3 rounded-2xl"
              style={{ 
                backgroundColor: accentRgba(0.25),
                boxShadow: `0 0 40px ${accentRgba(0.3)}, inset 0 0 30px ${accentRgba(0.1)}`,
              }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title || "Showcase Your Work"}
              </TextEditable>
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: `2px solid ${accentColor || titleColor}`,
                  opacity: 0.5,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${accentRgba(0.5)}`,
                    `0 0 40px ${accentRgba(0.3)}`,
                    `0 0 20px ${accentRgba(0.5)}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>
        ) : (
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight relative"
            style={{ color: titleColor || "var(--section-header, #ffffff)" }}
          >
            <span 
              className="relative inline-block px-6 py-3 rounded-2xl"
              style={{ 
                backgroundColor: accentRgba(0.25),
                boxShadow: `0 0 40px ${accentRgba(0.3)}, inset 0 0 30px ${accentRgba(0.1)}`,
              }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title || "Showcase Your Work"}
              </TextEditable>
            </span>
          </h1>
        )}

        {/* Subtitle with enhanced styling */}
        <motion.p
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ color: subtitleColor || "var(--section-subheader, rgba(255, 255, 255, 0.9))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TextEditable onClick={() => onEdit?.("subtitle")}>
            {subtitle || "Beautiful portfolios with stunning animations and interactions."}
          </TextEditable>
        </motion.p>

        {/* Enhanced Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="group relative px-10 py-5 rounded-xl text-lg font-semibold shadow-2xl overflow-hidden"
            style={{
              background: buttonBackground || "var(--section-button-bg, #ffffff)",
              color: buttonTextColor || "var(--section-button-text, #1f2937)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit?.("buttonText")}>
                {buttonText || "View Portfolio"}
              </TextEditable>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                boxShadow: `0 0 30px ${buttonBackground || "#ffffff"}80`,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {buttonText2 && (
            <motion.button
              className="group relative px-10 py-5 border-2 rounded-xl text-lg font-semibold backdrop-blur-md overflow-hidden"
              style={{
                background: button2Background || "var(--section-button2-bg, transparent)",
                color: button2TextColor || "var(--section-button2-text, #ffffff)",
                borderColor: accentRgba(0.5),
              }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: accentColor || "rgba(255,255,255,0.5)",
                boxShadow: `0 0 30px ${accentRgba(0.3)}`,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">
                <TextEditable onClick={() => onEdit?.("buttonText2")}>
                  {buttonText2}
                </TextEditable>
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )}
        </motion.div>

        {/* Feature Pills with glassmorphism */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.span
              key={index}
              className="px-5 py-2.5 rounded-full backdrop-blur-md border text-sm font-medium relative overflow-hidden group"
              style={{
                backgroundColor: accentRgba(0.15),
                borderColor: accentRgba(0.3),
                color: titleColor,
              }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: accentRgba(0.25),
                borderColor: accentRgba(0.5),
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
            >
              <span className="relative z-10">
                <TextEditable onClick={() => onEdit?.(`feature-${index}`)}>
                  ✓ {feature}
                </TextEditable>
              </span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${accentRgba(0.2)}, transparent)`,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 rounded-full flex justify-center p-2 backdrop-blur-md"
            style={{ 
              borderColor: accentRgba(0.5),
              backgroundColor: accentRgba(0.1),
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 rounded-full"
              style={{ 
                backgroundColor: accentColor || "rgba(255, 255, 255, 0.5)" 
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
