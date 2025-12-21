"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function CTAAnimated({
  title = "Ready to Get Started?",
  subtitle = "Join thousands of satisfied customers who have transformed their business with our platform.",
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
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }
    : { backgroundColor };

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <section
        ref={ref}
        className="py-24 px-6 relative overflow-hidden"
        style={backgroundStyle}
      >
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-2xl opacity-20"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                left: `${i * 20}%`,
                top: `${i * 15}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span
                className="px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-md border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: titleColor,
                }}
              >
                ✨ Limited Time Offer
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-6"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title}
              </TextEditable>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-xl @md:text-2xl mb-10 max-w-2xl mx-auto"
              style={{ color: subtitleColor }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <TextEditable onClick={() => onEdit?.("subtitle")}>
                {subtitle}
              </TextEditable>
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <span>✓ No credit card required</span>
              <span>✓ 14-day free trial</span>
              <span>✓ Cancel anytime</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
