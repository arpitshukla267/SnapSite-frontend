"use client";
import { useEffect, useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroAdvanced({ 
  title, 
  subtitle, 
  buttonText, 
  buttonText2,
  enableParticles = true,
  enableGradientAnimation = true,
  enableTextReveal = true,
  onEdit 
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonText2?: string;
  enableParticles?: boolean;
  enableGradientAnimation?: boolean;
  enableTextReveal?: boolean;
  onEdit?: (field: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: enableGradientAnimation 
          ? "var(--section-background, linear-gradient(135deg, #4f46e5 0%, #ec4899 50%, #22c55e 100%))"
          : "var(--section-background, #0f172a)"
      }}
    >
      {/* Animated Gradient Mesh Background */}
      {enableGradientAnimation && (
        <>
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
          
          {/* Animated Wave Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q25,25 50,50 T100,50' stroke='white' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Animated Grid Overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '50px 50px'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}

      {/* Enhanced Particles Effect */}
      {enableParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 50, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Floating Blobs with More Animation */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-white/15 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-white/15 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 bg-white/10 rounded-full blur-2xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
            ✨ Premium Experience
          </span>
        </motion.div>

        {/* Title with Text Reveal */}
        {enableTextReveal ? (
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            style={{ color: "var(--section-header, #ffffff)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title || "Build Something Amazing"}
            </TextEditable>
          </motion.h1>
        ) : (
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            style={{ color: "var(--section-header, #ffffff)" }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title || "Build Something Amazing"}
            </TextEditable>
          </h1>
        )}

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--section-subheader, rgba(255, 255, 255, 0.9))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TextEditable onClick={() => onEdit?.("subtitle")}>
            {subtitle || "Create stunning websites with our powerful builder. No coding required."}
          </TextEditable>
        </motion.p>

        {/* Buttons with Micro-interactions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl overflow-hidden"
            style={{
              background: "var(--section-button-bg, #ffffff)",
              color: "var(--section-button-text, #1f2937)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit?.("buttonText")}>
                {buttonText || "Get Started"}
              </TextEditable>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          {buttonText2 && (
            <motion.button
              className="group relative px-8 py-4 border-2 rounded-xl text-lg font-semibold backdrop-blur-md overflow-hidden"
              style={{
                background: "var(--section-button2-bg, transparent)",
                color: "var(--section-button2-text, #ffffff)",
                borderColor: "var(--section-button2-border, rgba(255, 255, 255, 0.3))",
              }}
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
