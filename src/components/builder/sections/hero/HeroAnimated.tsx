"use client";
import { useEffect, useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";
import { useParticleCanvas, AnimatedGradientBackground, AnimatedGrid, FloatingOrbs } from "../../../../lib/animations/hooks";
import { resolveBackgroundAnimation } from "../../../../lib/animations/resolver";
import { getDefaultAnimationConfig, mergeAnimationConfig, BackgroundAnimationConfig } from "../../../../lib/animations/config";
import { ParticleStars, ParticleFloating, ParticleBubbles, ParticleDots, ParticleWaves } from "../../../ui/particles";

export default function HeroAnimated({
  title = "Build Amazing Websites",
  subtitle = "Create stunning, responsive websites in minutes with our powerful drag-and-drop builder.",
  buttonText = "Get Started",
  buttonText2 = "Learn More",
  onEdit,
  backgroundColor = "#0f172a",
  gradientColors,
  titleColor = "#ffffff",
  subtitleColor = "#e2e8f0",
  buttonBackground = "#4f46e5",
  buttonTextColor = "#ffffff",
  button2Background = "transparent",
  button2TextColor = "#ffffff",
  accentColor,
  animationConfig,
  particleType = "stars",
  particleColor = "255, 255, 255",
  particleOpacity = 0.2,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonText2?: string;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get animation config (merge user config with defaults)
  const defaultConfig = getDefaultAnimationConfig("heroAnimated");
  const userConfig = animationConfig || {};
  const mergedConfig = mergeAnimationConfig(userConfig, defaultConfig);
  
  // Override gradient colors if provided
  if (gradientColors && gradientColors.length >= 2) {
    mergedConfig.gradient = {
      ...mergedConfig.gradient,
      colors: gradientColors,
    };
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
  }, [mergedConfig]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const accentRgba = (alpha: number) => {
    if (!accentColor) return `rgba(255, 255, 255, ${alpha})`;
    if (accentColor.startsWith('#')) {
      const r = parseInt(accentColor.slice(1, 3), 16);
      const g = parseInt(accentColor.slice(3, 5), 16);
      const b = parseInt(accentColor.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `${accentColor}${Math.round(alpha * 100)}`;
  };

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={gradientColors && gradientColors.length >= 2 ? {} : { backgroundColor: backgroundColor }}
      >
        {/* Animated Gradient Background - Must be first layer */}
        {gradientColors && gradientColors.length >= 2 ? (
          <AnimatedGradientBackground config={mergedConfig} />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: backgroundColor }} />
        )}

        {/* Animated Canvas Particles */}
        <canvas
          ref={canvasRef}
          id="particle-canvas-hero-animated"
          className="absolute inset-0 opacity-30"
          style={{ zIndex: 1, pointerEvents: "none" }}
        />

        {/* Animated Grid Background */}
        <AnimatedGrid config={mergedConfig} />

        {/* Floating Orbs */}
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
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          style={{
            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge with glow effect */}
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span
                className="px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-md border relative overflow-hidden"
                style={{
                  backgroundColor: accentRgba(0.15),
                  borderColor: accentRgba(0.3),
                  color: accentColor || titleColor,
                  boxShadow: `0 0 30px ${accentRgba(0.3)}, inset 0 0 20px ${accentRgba(0.1)}`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    
                  </motion.span>
                  <TextEditable onClick={() => onEdit?.("badge")}>
                    New: AI-Powered Builder
                  </TextEditable>
                </span>
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentRgba(0.3)}, transparent)`,
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </span>
            </motion.div>

            {/* Title with gradient text effect */}
            <motion.h1
              className="text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl font-extrabold mb-6 leading-tight relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span
                className="relative inline-block"
                style={{
                  background: gradientColors && gradientColors.length >= 2
                    ? `linear-gradient(135deg, ${titleColor}, ${gradientColors[1]}, ${titleColor})`
                    : titleColor,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <TextEditable onClick={() => onEdit?.("title")}>
                  {title}
                </TextEditable>
              </span>
              {/* Decorative underline */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                style={{
                  background: gradientColors && gradientColors.length >= 2
                    ? `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`
                    : accentColor || titleColor,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.h1>

            {/* Subtitle with enhanced styling */}
            <motion.p
              className="text-xl @md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: subtitleColor }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <TextEditable onClick={() => onEdit?.("subtitle")}>
                {subtitle}
              </TextEditable>
            </motion.p>

            {/* Buttons with enhanced design */}
            <motion.div
              className="flex flex-col @sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  background: buttonBackground,
                  color: buttonTextColor,
                }}
              >
                <span className="relative z-10">
                  <TextEditable onClick={() => onEdit?.("buttonText")}>
                    {buttonText}
                  </TextEditable>
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${buttonBackground}dd, ${buttonBackground}ff)`,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              {buttonText2 && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl text-lg font-bold border-2 backdrop-blur-md transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: button2Background,
                    color: button2TextColor,
                    borderColor: button2TextColor,
                  }}
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

            {/* Enhanced Stats with glassmorphism cards */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { number: "10K+", label: "Active Users", icon: "👥" },
                { number: "500+", label: "Templates", icon: "🎨" },
                { number: "99%", label: "Satisfaction", icon: "⭐" },
                { number: "24/7", label: "Support", icon: "💬" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl backdrop-blur-md border relative overflow-hidden group"
                  style={{
                    backgroundColor: accentRgba(0.1),
                    borderColor: accentRgba(0.2),
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    backgroundColor: accentRgba(0.15),
                    borderColor: accentRgba(0.3),
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    delay: 1 + index * 0.1, 
                    duration: 0.5 
                  }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2 + index * 0.5, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div
                    className="text-3xl @md:text-4xl font-bold mb-2"
                    style={{ color: titleColor }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm @md:text-base font-medium"
                    style={{ color: subtitleColor }}
                  >
                    {stat.label}
                  </div>
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at center, ${accentRgba(0.2)}, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-6 h-10 rounded-full border-2 flex justify-center p-2 backdrop-blur-md"
            style={{ 
              borderColor: accentColor || titleColor,
              backgroundColor: accentRgba(0.1),
            }}
          >
            <motion.div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: accentColor || titleColor }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
