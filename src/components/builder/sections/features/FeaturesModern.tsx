"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function FeaturesModern({
  title = "Why Choose Us",
  subtitle = "Discover what makes us different",
  items = [],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  items?: Array<{ title: string; desc: string; icon?: string }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; paragraphColor?: string; iconColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultItems = [
    { title: "Advanced Analytics", desc: "Track your performance with detailed insights" },
    { title: "Secure & Reliable", desc: "Enterprise-grade security for your data" },
    { title: "Scalable Solutions", desc: "Grow without limits" },
    { title: "Expert Team", desc: "Dedicated support when you need it" },
  ];

  const features = items.length > 0 ? items : defaultItems;

  return (
    <section
      ref={ref}
      className="py-24 @md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            className="text-xl @md:text-2xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "rgba(255, 255, 255, 0.05)";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardIconColor = cardColor.iconColor || accentColor;

            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                style={{ 
                  backgroundColor: cardBg,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => onEdit?.("items", index)}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 relative z-10"
                  style={{ background: `${cardIconColor}30` }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span style={{ color: cardIconColor }}>🚀</span>
                </motion.div>

                {/* Content */}
                <h3
                  className="text-2xl font-bold mb-3 relative z-10"
                  style={{ color: cardHeaderColor }}
                >
                  <TextEditable onClick={() => onEdit?.("items", index)}>
                    {feature.title}
                  </TextEditable>
                </h3>
                <p
                  className="leading-relaxed relative z-10"
                  style={{ color: cardParagraphColor }}
                >
                  <TextEditable onClick={() => onEdit?.("items", index)}>
                    {feature.desc}
                  </TextEditable>
                </p>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ background: cardIconColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

