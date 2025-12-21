"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function FeaturesPremium({
  title = "Why Choose Us",
  subtitle = "Discover the features that make us stand out from the competition",
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
    { title: "Advanced Analytics", desc: "Track performance with detailed insights", icon: "📊" },
    { title: "Custom Integrations", desc: "Connect with your favorite tools", icon: "🔌" },
    { title: "Priority Support", desc: "Get help when you need it most", icon: "💬" },
    { title: "Regular Updates", desc: "Always improving with new features", icon: "🔄" },
  ];

  const features = items.length > 0 ? items : defaultItems;

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${accentColor}30, transparent 50%), radial-gradient(circle at 80% 50%, #ec489930, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-4"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "rgba(255, 255, 255, 0.05)";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardIconColor = cardColor.iconColor || accentColor;

            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl backdrop-blur-md border overflow-hidden"
                style={{
                  backgroundColor: cardBg,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${cardIconColor}40, transparent)`,
                  }}
                />

                <div className="relative z-10 flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                    style={{
                      backgroundColor: `${cardIconColor}20`,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon || "✨"}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.(`items-${index}-title`, index)}>
                        {feature.title}
                      </TextEditable>
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: cardParagraphColor }}
                    >
                      <TextEditable onClick={() => onEdit?.(`items-${index}-desc`, index)}>
                        {feature.desc}
                      </TextEditable>
                    </p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: cardIconColor }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

