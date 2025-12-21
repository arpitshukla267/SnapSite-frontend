"use client";
import { useEffect, useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function HeroModern({
  title = "Transform Your Ideas Into Reality",
  subtitle = "The most powerful website builder that lets you create professional websites without coding.",
  buttonText = "Start Building",
  buttonText2 = "Watch Demo",
  onEdit,
  backgroundColor = "#ffffff",
  gradientColors,
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  buttonBackground = "#4f46e5",
  buttonTextColor = "#ffffff",
  button2Background = "#f1f5f9",
  button2TextColor = "#0f172a",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const waveRef = useRef<SVGSVGElement>(null);

  const backgroundStyle = gradientColors && gradientColors.length >= 2
    ? {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
      }
    : { backgroundColor };

  // Animated wave background
  useEffect(() => {
    if (!waveRef.current) return;

    const svg = waveRef.current;
    const paths = svg.querySelectorAll("path");

    paths.forEach((path, index) => {
      const pathElement = path as SVGPathElement;
      const length = pathElement.getTotalLength();
      pathElement.style.strokeDasharray = `${length}`;
      pathElement.style.strokeDashoffset = `${length}`;
      pathElement.style.animation = `drawWave ${3 + index}s ease-in-out infinite`;
    });
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes drawWave {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={backgroundStyle}
      >
        {/* Animated Wave Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg
            ref={waveRef}
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              style={{ color: titleColor }}
              animate={{
                d: [
                  "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>

        {/* Glassmorphism Cards Floating */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-2xl backdrop-blur-md border"
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            {/* Title with word-by-word reveal */}
            <motion.h1
              className="text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl font-extrabold mb-6 leading-tight"
              style={{ color: titleColor }}
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  <TextEditable onClick={() => onEdit?.("title")}>
                    {word}
                  </TextEditable>
                  {index < title.split(" ").length - 1 && " "}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle with fade in */}
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

            {/* Buttons with hover effects */}
            <motion.div
              className="flex flex-col @sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 relative overflow-hidden group"
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
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(241, 245, 249, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl text-lg font-bold border-2 transition-all duration-300 group"
                style={{
                  background: button2Background,
                  color: button2TextColor,
                  borderColor: button2TextColor,
                }}
              >
                <span className="flex items-center gap-2">
                  <TextEditable onClick={() => onEdit?.("buttonText2")}>
                    {buttonText2}
                  </TextEditable>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              className="mt-16 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {["No Code Required", "Drag & Drop", "Fully Responsive", "SEO Optimized"].map((feature, index) => (
                <motion.div
                  key={index}
                  className="px-6 py-3 rounded-full backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: titleColor,
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <span className="text-sm font-semibold">✓ {feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
