"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function CTAModern({
  title = "Ready to Get Started?",
  subtitle = "Join thousands of satisfied customers",
  buttonText = "Start Free Trial",
  onEdit,
  backgroundColor = "#4f46e5",
  gradientColors,
  titleColor = "#ffffff",
  subtitleColor = "#e2e8f0",
  buttonBackground = "#ffffff",
  buttonTextColor = "#4f46e5",
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
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`
      }
    : { backgroundColor };

  return (
    <section
      ref={ref}
      className="py-24 @md:py-32 px-6 relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)" }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)" }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl @sm:text-5xl @md:text-6xl font-extrabold mb-6"
            style={{ color: titleColor }}
            whileHover={{ scale: 1.02 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>

          <motion.p
            className="text-xl @md:text-2xl mb-10 max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.button
              className="px-12 py-6 rounded-2xl text-lg @md:text-xl font-bold shadow-2xl transition-all duration-300 relative overflow-hidden group"
              style={{
                background: buttonBackground,
                color: buttonTextColor,
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                <TextEditable onClick={() => onEdit?.("buttonText")}>
                  {buttonText}
                </TextEditable>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {["✓ No credit card required", "✓ 14-day free trial", "✓ Cancel anytime"].map((text, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

