"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function CTAGlass({
  title = "Transform Your Business Today",
  subtitle = "Experience the power of our platform and see why thousands of companies trust us.",
  buttonText = "Get Started Now",
  onEdit,
  backgroundColor = "#0f172a",
  gradientColors,
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  buttonBackground = "#4f46e5",
  buttonTextColor = "#ffffff",
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  gradientColors?: string[];
  titleColor?: string;
  subtitleColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundStyle = gradientColors && gradientColors.length >= 2
    ? {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
      }
    : { backgroundColor };

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(79, 70, 229, 0.6), transparent)`,
            top: "-20%",
            left: "-10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent)`,
            bottom: "-20%",
            right: "-10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Glassmorphism Card */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="p-12 @md:p-16 rounded-3xl backdrop-blur-xl border shadow-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-8 mx-auto"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🚀
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-6 text-center"
            style={{ color: titleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl @md:text-2xl mb-10 text-center max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>

          {/* Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 relative overflow-hidden group"
              style={{
                background: buttonBackground,
                color: buttonTextColor,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
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
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-12 grid grid-cols-1 @md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {["Free Setup", "24/7 Support", "Money Back"].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div
                  className="text-sm font-semibold"
                  style={{ color: titleColor }}
                >
                  ✓ {feature}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

