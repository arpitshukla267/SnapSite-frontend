"use client";
import { useEffect, useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

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
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animated gradient background
  const backgroundStyle = gradientColors && gradientColors.length >= 2
    ? {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }
    : { backgroundColor };

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={backgroundStyle}
      >
        {/* Animated Canvas Particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-30"
          style={{ zIndex: 1 }}
        />

        {/* Animated Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
            zIndex: 1,
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(79, 70, 229, 0.4), transparent)",
              left: "10%",
              top: "20%",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)",
              right: "10%",
              bottom: "20%",
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

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
            {/* Badge */}
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span
                className="px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-md border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: titleColor,
                }}
              >
                ✨ New: AI-Powered Builder
              </span>
            </motion.div>

            {/* Title with animated reveal */}
            <motion.h1
              className="text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl font-extrabold mb-6 leading-tight"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title}
              </TextEditable>
            </motion.h1>

            {/* Subtitle */}
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

            {/* Buttons */}
            <motion.div
              className="flex flex-col @sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300 relative overflow-hidden group"
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
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl text-lg font-bold border-2 backdrop-blur-md transition-all duration-300"
                style={{
                  background: button2Background,
                  color: button2TextColor,
                  borderColor: button2TextColor,
                }}
              >
                <TextEditable onClick={() => onEdit?.("buttonText2")}>
                  {buttonText2}
                </TextEditable>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { number: "10K+", label: "Active Users" },
                { number: "500+", label: "Templates" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="text-3xl @md:text-4xl font-bold mb-2"
                    style={{ color: titleColor }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm @md:text-base"
                    style={{ color: subtitleColor }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-6 h-10 rounded-full border-2 flex justify-center p-2"
            style={{ borderColor: titleColor }}
          >
            <motion.div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: titleColor }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
